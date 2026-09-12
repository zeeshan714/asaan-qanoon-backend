from rag import build_index

if __name__ == "__main__":
    count = build_index(reset=True)
    print(f"Done: {count} source chunks indexed in ChromaDB.")
