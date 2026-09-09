import { View, Text, FlatList, Pressable, useWindowDimensions } from "react-native";
import styles from '../styles/HomeStyles';
import Card from "../componentes/card";
import { useEffect, useRef, useState } from "react";

interface Card {
    id: string,
    pair: string,
    isVisible: boolean,
    isCompleted: boolean,
    imageSource: string,
}

function Home() {
    const [listaCards, setListaCards] =  useState<Card[]>([]);
    const cardsVisiveis = useRef<Card[]>([]);
    const [jogoIniciado, setJogoIniciado] = useState(false);
    const totalCardsCompletados = useRef<number>(0);

    const { width } = useWindowDimensions();
    const numColumns = width < 600 ? 2 : 4;

    const cards: Card[] = [
        { id: '1', pair: '2', isVisible: false, isCompleted: false, imageSource: "https://static.vecteezy.com/ti/fotos-gratis/t2/60843811-fechar-se-do-pingos-de-chuva-em-folhas-hd-fundo-luxo-hd-papel-de-parede-imagem-na-moda-fundo-ilustracao-gratis-foto.jpg" },
        { id: '10', pair: '9', isVisible: false, isCompleted: false,  imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPHel-QhikAjTksdq3UxC_4Yyf4EC0zJjRc2eTU5RYkvEAkhUqswXp-h1&s=10" },
        { id: '8', pair: '7', isVisible: false, isCompleted: false,  imageSource: "https://media.istockphoto.com/id/157373207/pt/foto/pedras-seixo-de-equil%C3%ADbrio-numa-praia-durante-o-p%C3%B4r-do-sol.jpg?s=612x612&w=0&k=20&c=Dr0EC4zTDog__QLGwDyadphWXZCDyzx_FXAeis1iKkM=" },
        { id: '3', pair: '4', isVisible: false, isCompleted: false,  imageSource: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg" },
        { id: '5', pair: '6', isVisible: false, isCompleted: false,  imageSource: "https://prefeitura.rio/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-16-at-16.42.03.jpeg" },
        { id: '11', pair: '12', isVisible: false, isCompleted: false,  imageSource: "https://cdn.pixabay.com/photo/2016/11/22/23/53/starfish-1851289_1280.jpg" },
        { id: '7', pair: '8', isVisible: false, isCompleted: false,  imageSource: "https://media.istockphoto.com/id/157373207/pt/foto/pedras-seixo-de-equil%C3%ADbrio-numa-praia-durante-o-p%C3%B4r-do-sol.jpg?s=612x612&w=0&k=20&c=Dr0EC4zTDog__QLGwDyadphWXZCDyzx_FXAeis1iKkM=" },
        { id: '6', pair: '5', isVisible: false, isCompleted: false,  imageSource: "https://prefeitura.rio/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-16-at-16.42.03.jpeg" },
        { id: '2', pair: '1', isVisible: false, isCompleted: false, imageSource: "https://static.vecteezy.com/ti/fotos-gratis/t2/60843811-fechar-se-do-pingos-de-chuva-em-folhas-hd-fundo-luxo-hd-papel-de-parede-imagem-na-moda-fundo-ilustracao-gratis-foto.jpg" },
        { id: '9', pair: '10', isVisible: false, isCompleted: false,  imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPHel-QhikAjTksdq3UxC_4Yyf4EC0zJjRc2eTU5RYkvEAkhUqswXp-h1&s=10" },
        { id: '12', pair: '11', isVisible: false, isCompleted: false,  imageSource: "https://cdn.pixabay.com/photo/2016/11/22/23/53/starfish-1851289_1280.jpg" },
        { id: '4', pair: '3', isVisible: false, isCompleted: false,  imageSource: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg" },    
    ]

    function toggleCard(card: Card) {
        if (card.isVisible || card.isCompleted) return;

        setListaCards(prevLista =>
            prevLista.map(item => item.id === card.id  ? { ...item, isVisible: !item.isVisible }  : item )
        );

        cardsVisiveis.current.push(card);

        if (cardsVisiveis.current.length === 2) {
            const [primeiro, segundo] = cardsVisiveis.current;
            
            if (primeiro.pair === segundo.id) {
                setTimeout(() => {
                    setListaCards(prevLista =>
                        prevLista.map(item => item.id === primeiro.id || item.id === segundo.id ? { ...item, isCompleted: true } : item )
                    );
                }, 1000);

                totalCardsCompletados.current+=2;
            } else {
                setTimeout(() => {
                    setListaCards(prevLista =>
                        prevLista.map(item => item.id === primeiro.id || item.id === segundo.id ? { ...item, isVisible: false } : item )
                    );
                }, 500);  
            }

            cardsVisiveis.current = [];
        }
    }

    function start() {
        setListaCards(cards);

        setListaCards(prevLista =>
            prevLista.map(item => ({...item, isVisible: true }))
        );

        setTimeout(() => {
            setListaCards(prevLista =>
                prevLista.map(item => ({...item, isVisible: false }))
            );
        }, 1000);

        totalCardsCompletados.current = 0;
    }

    useEffect(() => {
        setListaCards(cards);

        totalCardsCompletados.current = 0;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogo da memória</Text>

            <Text style={styles.totalPairs}>Total de pares encontrados: {totalCardsCompletados.current}</Text>
            
            { totalCardsCompletados.current == listaCards.length && 
                <View>
                    <Text style={styles.totalPairs}>Parabéns, você ganhou!</Text>
                    <Pressable
                        onPress={() => start()}
                        style={styles.button}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Recomeçar</Text>
                    </Pressable>
                </View>
            }

            <FlatList
                data={listaCards.filter(item => !item.isCompleted)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                    <Pressable
                        onPress={() => toggleCard(item)}
                    >
                        <Card imageSource={item.imageSource} isVisible={item.isVisible} />
                    </Pressable>
                }
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.row}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
            />

            {!jogoIniciado && (
                <View style={styles.overlay}>
                    <Pressable 
                        style={styles.botaoComecar} 
                        onPress={() => {setJogoIniciado(true); start()}}
                    >
                        <Text style={styles.textoBotao}>Começar jogo</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Home;