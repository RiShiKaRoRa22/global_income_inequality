import streamlit as st

users = {
    "admin": "1234",
    "rishika": "pass"
}

def login():
    st.title("🔐 Login Page")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")

    if st.button("Login"):
        if username in users and users[username] == password:
            st.session_state.logged_in = True
            st.success("Login successful")
            st.rerun()
        else:
            st.error("Invalid credentials")