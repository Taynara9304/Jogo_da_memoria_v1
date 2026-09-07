import { View, Text, Image } from "react-native";
import styles from './styles'

interface CardProps {
    isVisible: boolean,
    imageSource: string,
}

function Card({ imageSource, isVisible }: CardProps) {
    return (
        <View style={styles.container}>
            {
                isVisible &&
                <Image source={{ uri: imageSource }} style={styles.image} />
            }
        </View>
    );
};

export default Card;