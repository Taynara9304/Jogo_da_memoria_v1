import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 24
    },
    totalPairs: {
        fontSize: 18,
        marginBottom: 24
    },
    list: {
        gap: 20,
        alignItems: 'center',
    },
    row: {
        gap: 20,
        justifyContent: 'flex-start'
    },
    button: {
        backgroundColor: '#7543c6',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoComecar: {
        backgroundColor: '#6959cf',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    textoBotao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
});

export default styles;