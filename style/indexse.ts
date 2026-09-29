import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
container: 
{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
},

title: 
{
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center"
},

subtitle: 
{
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center"
},

link: 
{
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
},

linkText: 
{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
},
}as const); 