import { StyleSheet } from "react-native"
export const styles=StyleSheet.create({
    content:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        gap:10
    },
    inputs:{
        width:"90%",

    },
    buttons:{
        width:"90%",

    },
    textNavigation:{
        marginTop:20,
        fontSize:15,
        color:"#530E69",
        fontWeight:"bold",
        
    },
    contentHome:{
        flex:1,
        marginVertical:50,
        marginHorizontal:20
    },
    iconProfile:{
        flex:1,
        alignItems:"flex-end"
    },
    modalProfile:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:"#fff",
        marginHorizontal:20,
        borderRadius:10,
    },
    headerModal:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    contentLetter:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:30,
        alignItems:'center',

    },
    iconLetter:{
        flex:1,
        alignItems:"flex-end"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
      subjectLetter:{
        flexDirection:'row',
        alignItems:'center'
      },
      contentDetailLetter:{
        flex:1,
        paddingHorizontal:20,
        backgroundColor:'#fff',
        gap:20

      },
      textMessage:{
        marginBottom:10,
        fontWeight:'bold',
        fontSize:10
      }
});