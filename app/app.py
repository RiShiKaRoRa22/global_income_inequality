import streamlit as st
from auth import login
from chatbot import chatbot_ui

from pages import about, dashboard, map, contact

st.set_page_config(page_title="Global Inequality Dashboard", layout="wide")

# session
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

# login
if not st.session_state.logged_in:
    login()
    st.stop()

# sidebar
st.sidebar.title("🌍 Navigation")

page = st.sidebar.radio(
    "Go to",
    ["Dashboard", "Map", "About Us", "Contact Us"]
)

# chatbot toggle
if st.sidebar.button("💬 AI Assistant"):
    chatbot_ui()

# routing
if page == "Dashboard":
    dashboard.show()
elif page == "Map":
    map.show()
elif page == "About Us":
    about.show()
elif page == "Contact Us":
    contact.show()