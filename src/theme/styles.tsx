import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    inputs: {
        width: "90%",
    },
    buttons: {
        width: "90%",
    },
    textNavigation: {
        marginTop: 20,
        fontSize: 15,
        color: "#607D8B", 
        fontWeight: "bold",
    },
    contentHomeFarmacia: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20
    },
    iconProfile: {
        flex: 1,
        alignItems: "flex-end"
    },
    modalProfile: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#E1F5FE", 
        marginHorizontal: 20,
        borderRadius: 10,
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentDetailFarmacia: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 30,
        alignItems: 'center',
    },
    iconLetter: {
        flex: 1,
        alignItems: "flex-end"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#64B5F6", 
    },
    subjectLetter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentDetailLetter: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', 
    },
    textMessage: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 10,
        color: "#757575"
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      userImage: {
        width: 50, 
        height: 50, 
        borderRadius: 25, 
      },
});
