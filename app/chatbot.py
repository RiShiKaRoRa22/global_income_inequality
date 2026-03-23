import streamlit as st

def chatbot_ui():
    st.sidebar.subheader("🤖 AI Assistant")

    query = st.sidebar.text_input("Ask a question")

    if query:
        if "inequality" in query.lower():
            st.sidebar.write("AI: Inequality refers to unequal distribution of resources.")
        else:
            st.sidebar.write("AI: Try asking about inequality or the dashboard.")