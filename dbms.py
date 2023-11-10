import streamlit as st
import mysql.connector
import xml.etree.ElementTree as ET
import pandas as pd

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ma@131216ash@4832",
    database="OnlineBookstore"
)
cursor = conn.cursor()

# Create Streamlit app
st.title("Online Bookstore")

# Function to insert data from XML file to the database
def insert_data_from_xml(xml_file):
    xml_tree = ET.parse(xml_file)
    xml_root = xml_tree.getroot()
    for table in xml_root:
        table_name = table.tag
        for row in table:
            data = {}
            for attr in row:
                data[attr.tag] = attr.text

            # Construct an SQL INSERT query
            insert_query = f"INSERT INTO {table_name} ({', '.join(data.keys())}) VALUES ({', '.join(['%s'] * len(data))})"
            values = list(data.values())

            # Execute the INSERT query
            cursor.execute(insert_query, values)
    conn.commit()

# Function to view a specific table
def view_table(table_name):
    cursor.execute(f"SELECT * FROM {table_name}")
    data = cursor.fetchall()
    st.dataframe(data)

# Function to view all records in a table
def view_all_records(table_name):
    cursor.execute(f"SELECT * FROM {table_name}")
    data = cursor.fetchall()
    if data:
        df = pd.DataFrame(data, columns=[i[0] for i in cursor.description])
        st.dataframe(df)
    else:
        st.warning(f"No records found in the {table_name} table.")


# Function to update book details from an XML file
def update_book_from_xml(xml_file):
    xml_tree = ET.parse(xml_file)
    xml_root = xml_tree.getroot()
    for table in xml_root:
        table_name = table.tag
        for row in table:
            data = {}
            for attr in row:
                data[attr.tag] = attr.text
            st.success(data)
            # Construct an SQL UPDATE query
            #update_query = f"UPDATE {table_name} SET Quantity = %s WHERE BookID = %s"
            values = [data["BookID"],data["Title"], data["Author"], data["Price"], data["Quantity"]]
            final_query = "UPDATE "+table_name+" SET Quantity = "+data["Quantity"]+" WHERE BookID = "+data["BookID"]
            
            # Execute the UPDATE query
            cursor.execute(final_query)
    conn.commit()

# Function to delete a book from the cart based on CartID
def delete_book_from_cart(cart_id):
    delete_query = "DELETE FROM carts WHERE CartID = %s"
    cursor.execute(delete_query, (cart_id,))
    conn.commit()

# Function to delete all records from a table
def delete_all_records(table_name):
    delete_query = f"DELETE FROM {table_name}"
    cursor.execute(delete_query)
    conn.commit()

# Frontend menu
menu = st.selectbox("Select an option", ["Insert XML data", "View", "View All", "Update", "Delete", "Delete All"])

if menu == "Insert XML data":
    uploaded_file = st.file_uploader("Upload an XML file to insert data to the database", type=["xml"])
    if uploaded_file:
        insert_data_from_xml(uploaded_file)
        st.success("Data inserted successfully!")

if menu == "View":
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    table_names = [table[0] for table in tables]
    selected_table = st.selectbox("Select a table to view", table_names)
    if selected_table:
        view_table(selected_table)

if menu == "View All":
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    table_names = [table[0] for table in tables]
    st.write("View All Records in Selected Table:")
    for selected_table in table_names:
        st.subheader(selected_table)
        view_all_records(selected_table)

if menu == "Update":
    update_file = st.file_uploader("Upload an XML file to update book details", type=["xml"])
    if update_file:
        update_book_from_xml(update_file)
        st.success("Book details updated successfully!")

if menu == "Delete":
    cart_id = st.number_input("Enter CartID of the book to delete", min_value=1)
    if st.button("Delete"):
        delete_book_from_cart(cart_id)
        st.success(f"Book with CartID {cart_id} deleted from the cart!")

if menu == "Delete All":
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    table_names = [table[0] for table in tables]
    selected_table = st.selectbox("Select a table to delete all records", table_names)
    if st.button("Delete All Records"):
        delete_all_records(selected_table)
        st.success(f"All records from the {selected_table} table have been deleted!")

# Close the cursor and connection
cursor.close()
conn.close()
