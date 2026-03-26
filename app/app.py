import streamlit as st
from auth import login
from chatbot import chatbot_ui

from pages import home, dashboard, map, insights, contact

st.set_page_config(page_title="Global Income Inequality", layout="wide")

# load css
from pathlib import Path

css_path = Path(__file__).resolve().parent.parent / "assets" / "style.css"
if css_path.exists():
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
else:
    st.warning(f"CSS file not found at: {css_path}. Using default theme.")

# session
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

# login
if not st.session_state.logged_in:
    login()
    st.stop()

# sidebar
st.sidebar.title("🌍 Global Inequality")

page = st.sidebar.radio(
    "Navigation",
    ["Home", "Dashboard", "Map", "Insights", "Contact"]
)

st.sidebar.markdown("---")

if st.sidebar.button("🤖 AI Assistant"):
    chatbot_ui()

# routing
if page == "Home":
    home.show()
elif page == "Dashboard":
    dashboard.show()
elif page == "Map":
    map.show()
elif page == "Insights":
    insights.show()
elif page == "Contact":
    contact.show()