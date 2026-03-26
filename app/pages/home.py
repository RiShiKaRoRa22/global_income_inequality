import streamlit as st

def show():
    st.title("🌍 Global Income Inequality Analysis")

    st.markdown("""
    ### Understanding the gap between wealth and poverty

    This platform provides insights into:
    - Income distribution across countries
    - Economic disparities
    - Trends and patterns using data visualization
    """)

    col1, col2, col3 = st.columns(3)

    col1.metric("Countries Analyzed", "150+")
    col2.metric("Avg Gini Index", "38.5")
    col3.metric("Data Sources", "World Bank")

    st.image("https://images.unsplash.com/photo-1526304640581-d334cdbbf45e")