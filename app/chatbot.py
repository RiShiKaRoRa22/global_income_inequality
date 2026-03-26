import streamlit as st

def chatbot_ui():
    st.sidebar.subheader("🤖 AI Assistant")

    query = st.sidebar.text_input("Ask about inequality")

    if query:
        st.sidebar.write("AI:", generate_response(query))

def generate_response(q):
    if "gini" in q.lower():
        return "Gini index measures income inequality from 0 (equal) to 100 (unequal)."
    return "Ask about income inequality, trends, or countries."