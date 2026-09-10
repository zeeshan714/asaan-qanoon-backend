import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(req: Request) {
  try {
    const { conversationId, userId, message } = await req.json();

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'User ID and message are required' },
        { status: 400 }
      );
    }

    let currentConversationId = conversationId;

    // 1. Create a new conversation if it doesn't exist
    if (!currentConversationId) {
      const { data: convData, error: convError } = await supabaseAdmin
        .from('conversations')
        .insert({
          user_id: userId,
          title: message.substring(0, 30) + '...',
        })
        .select()
        .single();

      if (convError) throw convError;
      currentConversationId = convData.id;
    }

    // 2. Save user message to database
    const { error: userMsgError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: currentConversationId,
        sender: 'user',
        content: message,
      });

    if (userMsgError) throw userMsgError;

    // 3. Simulated AI response (Replace with Gemini/RAG integration next)
    const aiResponseText = `آسان قانون AI: آپ کے سوال "${message}" کا قانونی تجزیہ تیار کیا جا رہا ہے۔ پاکستان کے قوانین کے مطابق آپ کی مکمل رہنمائی کی جائے گی۔`;

    // 4. Save AI message to database
    const { data: aiMsg, error: aiMsgError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: currentConversationId,
        sender: 'ai',
        content: aiResponseText,
        sources: ['Pakistan Penal Code', 'Constitution of Pakistan'],
      })
      .select()
      .single();

    if (aiMsgError) throw aiMsgError;

    return NextResponse.json({
      success: true,
      conversationId: currentConversationId,
      reply: aiResponseText,
      messageData: aiMsg,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}