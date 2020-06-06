import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
// using Image because typescript was complaining when imported the image using import
import {
	View,
	ImageBackground,
	Text,
	Image,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
	sigla: string;
}

interface IBGECityResponse {
	nome: string;
}

const Home = () => {
	const [ufsFromApi, setUfsFromApi] = useState<string[]>([]);
	const [citiesFromApi, setCitiesFromApi] = useState<string[]>([]);

	// uf escolhida
	const [uf, setUf] = useState('');
	// cidade escolhida
	const [city, setCity] = useState('');

	// navegar de uma tela para outra
	const navigation = useNavigation();

	// get states from IBGE api and store them on the state
	useEffect(() => {
		axios
			.get<IBGEUFResponse[]>(
				'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
			)
			.then((response) => {
				const ufInitials = response.data.map((uf) => uf.sigla);
				setUfsFromApi(ufInitials);
			});
	}, []);

	// get citiesFromApi from a uf from IBGE api and store them on the state
	useEffect(() => {
		// if no uf was selected, don't show any city
		if (uf === '') {
			return;
		}

		// carregar as cidades sempre que a uf mudar
		axios
			.get<IBGECityResponse[]>(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
			)
			.then((response) => {
				const cityNames = response.data.map((city) => city.nome);
				setCitiesFromApi(cityNames);
			});
	}, [uf]);

	function handleNavigateToPoints() {
		console.log(uf, city);
		navigation.navigate('Points', {
			uf,
			city,
		});
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={{ flex: 1 }}
		>
			<ImageBackground
				source={require('../../assets/home-background.png')}
				style={styles.container}
				imageStyle={{ width: 274, height: 368 }}
			>
				<View style={styles.main}>
					<Image source={require('../../assets/logo.png')} />
					<View>
						<Text style={styles.title}>
							Seu marketplace de coleta de resíduos
						</Text>
						<Text style={styles.description}>
							Ajudamos pessoas a encontrarem pontos de coleta de forma
							eficiente.
						</Text>
					</View>
				</View>

				<View style={styles.footer}>
					<View style={styles.select}>
						<RNPickerSelect
							style={selectStyles}
							placeholder={{ label: 'Escolha a UF' }}
							value={uf}
							onValueChange={(value) => setUf(value)}
							items={ufsFromApi.map((uf) => ({ label: uf, value: uf }))}
						/>
					</View>

					<View style={styles.select}>
						<RNPickerSelect
							style={selectStyles}
							placeholder={{ label: 'Escolha a cidade' }}
							onValueChange={(value) => setCity(value)}
							items={citiesFromApi.map((city) => ({
								label: city,
								value: city,
							}))}
						/>
					</View>

					<RectButton style={styles.button} onPress={handleNavigateToPoints}>
						<View style={styles.buttonIcon}>
							<Text>
								<Icon name='arrow-right' color='#FFF' size={24} />
							</Text>
						</View>
						<Text style={styles.buttonText}>Entrar</Text>
					</RectButton>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
	},

	main: {
		flex: 1,
		justifyContent: 'center',
	},

	title: {
		color: '#322153',
		fontSize: 32,
		fontFamily: 'Ubuntu_700Bold',
		maxWidth: 260,
		marginTop: 64,
	},

	description: {
		color: '#6C6C80',
		fontSize: 16,
		marginTop: 16,
		fontFamily: 'Roboto_400Regular',
		maxWidth: 260,
		lineHeight: 24,
	},

	footer: {},

	select: {
		height: 60,
		backgroundColor: '#FFF',
		borderRadius: 10,
		marginBottom: 8,
		paddingHorizontal: 14,
		paddingVertical: 5,
		fontSize: 16,
	},

	button: {
		backgroundColor: '#34CB79',
		height: 60,
		flexDirection: 'row',
		borderRadius: 10,
		overflow: 'hidden',
		alignItems: 'center',
		marginTop: 8,
	},

	buttonIcon: {
		height: 60,
		width: 60,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonText: {
		flex: 1,
		justifyContent: 'center',
		textAlign: 'center',
		color: '#FFF',
		fontFamily: 'Roboto_500Medium',
		fontSize: 16,
	},
});

const selectStyles = {
	inputIOS: {
		color: '#6C6C80',
	},
	inputAndroid: {
		color: '#6C6C80',
	},
	placeholder: {
		color: '#6C6C80',
	},
};

export default Home;
