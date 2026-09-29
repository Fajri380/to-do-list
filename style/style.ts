import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
container: 
    {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 16,
    },

heading: 
    {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 16,
        marginTop: 8,
    },

input: 
    {
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: "#000",
        marginBottom: 14,
    },

textArea: 
    {
        height: 140,
        paddingTop: 12,
    },

button: 
    {
        backgroundColor: "#2196F3",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginTop: 6,
    },

buttonText: 
    {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 14,
    },

listHeading: 
    {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginTop: 24,
        marginBottom: 10,
    },

list: 
    {
        flex: 1,
    },

emptyText: 
    {
        color: "#999",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
    },

card: 
    {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },

checkbox: 
    {
        marginRight: 10,
        padding: 4,
    },

checkboxx: 
    {
        marginRight: 10,
        padding: 4,
    },

completedText: 
    {
        textDecorationLine: "line-through",
        color: "#999",
    },

cardContent: 
    {
        flex: 1,
    },

cardTitle: 
    {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },

cardDesc: 
    {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
    },

deleteBtn: 
    {
        backgroundColor: "#e53935",
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginLeft: 10,
    },

deleteText: 
    {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },

subTaskRow:
    {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

checkboxIcon:
    {
        marginRight: 6,
        fontSize: 14,
    }
});