import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId, documentType, title, content } = await req.json();

    if (!userId || !title || !content) {
      return NextResponse.json(
        { error: 'User ID, Title, and Content are required' },
        { status: 400 }
      );
    }

    // 1. Generate PDF Document
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title.toUpperCase(), 20, 20);

    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content, 170);
    doc.text(splitText, 20, 40);

    const pdfBase64 = doc.output('datauristring');

    // 2. Save document record into Supabase
    const { data: savedDoc, error: dbError } = await supabaseAdmin
      .from('saved_documents')
      .insert({
        user_id: userId,
        document_type: documentType || 'Legal Document',
        title: title,
        content_data: { body: content },
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({
      success: true,
      documentId: savedDoc.id,
      pdfData: pdfBase64,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}