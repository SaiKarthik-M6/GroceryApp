import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const MAX_WIDTH = 480;

const cartItems = [
	{
		name: 'Organic Bananas',
		qty: 1,
		price: 0.99,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDzldBM6j6dZBBbHXhcCRum53mjjSRzREbANtsOSWLOinMSOhc37l7xDRC-0-0QT9YF00-0AG4ymLj_jZpMo7ABGytJZwCiiNvU4zAHRkh7ZEg8LNrlcNA5w_c6neco0Za9yt8ovNO5T1r-nWgl1iaQhdfXec6wBxrdv74v22qdDYbZUGntKKADS0cO8kSn8GhLqnMP2BxasqcN18cgHpm-5yo2k4PdYh8mjrjcsttzPnH0PWxFnCqlIS4QZC15spYs9_0PZ2QGMphv',
	},
	{
		name: 'Avocados',
		qty: 2,
		price: 3.98,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBV8rvzuqVfvF18YH5kMrpCiSuwqiv2v2ih4UxKsmuptd6muo-ZEejeIvdr_GEsEesAEFgcliQ9e6otAh7Uf_e-UUXS5SVHMH6Y2WrRsPAUMwNFPf_Hv-9-II-LT0F8p6HtMf4c01abSSqa0Qfr7SnbznxwFk_FRQJ-1PXNJj1OM_BF2hjwauPfPlTUN_09uZIrN-4BYVOyjdkz_Y5tgJG1d7514e0s5Cw4JxSvl80D2NSN8Kt4BzVZsZyhmiu3SAIWpPU7WJHti33d',
	},
	{
		name: 'Whole Milk',
		qty: 1,
		price: 2.49,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBGZECmQGwMPA56F76TWT41_4N9RhO-u0vA26GrNfd2FoLq7R68kRM_-ImynZpHT4EaqQZtl83Vh0Uc8LQMq_SrRp0O7PgoipLwBBGfXUvr97gQ1jcAYrj5FZ5XlAFeTvzlPYvnAsB9x9UvgcIfYCasTZ7cNUNaH3Wjlec22pdnhXzN3yKQbZVSeSdLPK6kVX2-CCy4HvKJb8hqCH3-h_KtHsEmrb3FKEO_HDmmraw3AWOOjE2Z10IGWGq-oXpk1ZZQXosNxWsQG8Eb',
	},
	{
		name: 'Cheddar Cheese',
		qty: 1,
		price: 4.99,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuALqo28cFlje3y7aKcPtq9w3E9jZZfzV4bW8DLadRvz8p9RYnT1myP_iTjc9AJEgyfuuEBJ4R-zO48VJbnM88LvmtlzDZOEwH5S1zpP3a-4gdgzlIgkDmMK0OKTi-l4JsjgVYN6Jl1h7B0sf28GPig6i8Rl89YD7JLbTIYUx5d2v395SGZ62YNtEOA3YpvvnZ7lSrTHCFHenIXYmM6FyUH_JNd2FrADsit8b6dxWOw_I2yr2rijx7lbZBKsSOC01LopMtYmCTsr4gl0',
	},
	{
		name: 'Chicken Breast',
		qty: 1,
		price: 7.99,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDBHM3oe8cDAWBVCkrFX5Hd2X0IAUkatFi2esnQHRpbo_wdsOJ2fQ9kUCb37fj4zs5BcqCRYzim4-GlVCIY3jLO9JJXjKW_P5PairSIe7qOm8IrqfctIcrDbWsNB1Oq6ELDheUtpGiHeri5rd4HLkkABaRtmS8jtGzM-wiT9mtLA6HVcje-M5YDW2O0U95758BW5K1sSLSmwAmGXgo1FNYXfjrJ2sxn0A4yapPlme-I1Bmca7kXrimFO_kAUlVGbUARzdDUTIuiZYWU',
	},
	{
		name: 'Salmon Fillet',
		qty: 1,
		price: 12.99,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCCE2Xazb_iSW1iUDeUggNflllLj-5m1aiuFXoia48DUzEKVb3FQcFuiWSmpOU-bLhcm2HpLhYPyFWBJpE3KyfA4NFnCIM6B8r3cWlyfQI922rw2U65ueIguHnd4IcOnoxKiKuaKEkQxP6el7ocmD2ZZoYr6NAwL6FNJvlugBmx1LhriE52VDIq_vR3-4j302Hp2BSlV9e7H11UtAieF1AONM3sbvuK-I1MKGNoTaWGxDxrC3VelWIzWfNapNWtVN-QDx0QAxZLMG8u',
	},
	{
		name: 'Broccoli',
		qty: 1,
		price: 1.49,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBu5amNQSPPUiMVbcTKbUOfyIxQkJ6EJCesHdLMztYTYtNCEKSiz7Dhk-Ykhkc-9LjPefNkm-Iuh5mClezZX1OpgL_d83m-qfp60Srm7bgzjex2WpzW2yUkO2KdJ9G9twFcVzG8pMzMBlB-mIw71J71-3o-TS_UrqZFua-KjULy6C8VE0ptLqfxBqxtwCbIrqcgjdxNAlr275ZhnI-tWO90L83gCz16S8XBbbUChO5ZsMaLr0hU49aqkU-MSoNiV8dgUJgv37ZKBcYK',
	},
	{
		name: 'Tomatoes',
		qty: 1,
		price: 2.99,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBLIanKr_n7hiP36A-bXsnNzXNNOBZAkkAxJWuFGZj5AH4pnrkc32jyo-ULlJOBdaXUJ5-EyxaJ9AFD53ZtLgfqrAeQWxhAhEp8MxAVObiFUIL4YR-qyWKz1vWotLAizlN7xVkLWhvR-JunPrNwpOEfYvZdEBmfHLCBYwEXSx6-sfIqRodqzlv8dg5x53LZxrWWBTVyuC5u70ZXzLxIYWfKLGdW-T9OEog_QmPjFkdzgx97-stMHAQH-WsPM66SCR6bLkDh3De4IaZS',
	},
	{
		name: 'Spinach',
		qty: 1,
		price: 2.49,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDkvvNPy6HBrBfwrEMhXPNA1UKvygj52kyJPbRh4G6q8a_76bXAa3zNYpW7ZKhlh-G6mPEYLHLEYKnqoHhnhk5hRyCMiu5FRkA6JLz1gioXIEc833U-HZ5eMkQIhIlUyA1wYsoDz187NOhjafHDWU9Abhnf-RwWIszp3ATvoPpYllbujSxjBEm2T9xrOW5x_HKC8mNVCGzNMdjOy9gp84NeJodbchWzexmGtmCKK2gZSz7mcwf7hrpJTd6NhT3NFfXBqbkT-AKwh26J',
	},
	{
		name: 'Apples',
		qty: 1,
		price: 1.99,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuA10in9GA4t8OMSRonfqR_4BO5FYPQccHfOS8sMQxQX_MlX146gKtjDdD7K0L4B_uD2upYTka7q7vF-kbkoQqQAg6nEa_DsfpsagnaY5oL7HFKxfu897jGdpaha4FEiDLpaS3R5dEszFRVk8cY0-bGYzujMcAn8HJ7pN11XrI26DcbDgYl6BjwHxWTWygTLJbHehzieHbHzZGCsc5zI3NFdhMH5_JvArSzt9zmkdH0BNDrdQfXZNNLU_hxYbAhOJsyJ2dV-21d7ZQB1',
	},
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
const deliveryFee = 4.99;
const total = subtotal + deliveryFee;

export default function Cart() {
	const router = useRouter();
	return (
		<SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				<View style={styles.innerContainer}>
					{/* Header */}
					<View style={styles.headerRow}>
						<TouchableOpacity onPress={() => router.back()} style={styles.backButton} accessibilityLabel="Go back">
							<Ionicons name="arrow-back" size={24} color="#171212" />
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Shopping Cart</Text>
						<View style={{ width: 32 }} />
					</View>

					{/* Cart Items */}
					{cartItems.map((item, idx) => (
						<View key={idx} style={styles.cartRow}>
							<View style={styles.cartItemLeft}>
								<Image source={{ uri: item.image }} style={styles.cartImage} />
								<View style={styles.cartItemText}>
									<Text style={styles.cartItemName}>{item.name}</Text>
									<Text style={styles.cartItemQty}>{item.qty}</Text>
								</View>
							</View>
							<Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
						</View>
					))}

					{/* Summary */}
					<View style={styles.summaryBox}>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryLabel}>Subtotal</Text>
							<Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryLabel}>Delivery Fee</Text>
							<Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryLabel}>Total</Text>
							<Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
						</View>
					</View>

					{/* Checkout Button */}
					<TouchableOpacity
						style={styles.checkoutButton}
						activeOpacity={0.85}
						onPress={() => {
							/* Implement checkout */
						}}
					>
						<Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		alignItems: 'center',
		paddingBottom: 32,
		paddingTop: 0,
	},
	innerContainer: {
		width: '100%',
		maxWidth: MAX_WIDTH,
		alignSelf: 'center',
		paddingHorizontal: 0,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 24,
		paddingBottom: 8,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		width: '100%',
	},
	backButton: {
		padding: 8,
		borderRadius: 20,
	},
	headerTitle: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#171212',
	},
	cartRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 12,
		marginHorizontal: 16,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOpacity: 0.03,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 1 },
		elevation: 1,
		justifyContent: 'space-between',
	},
	cartItemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cartImage: {
		width: 56,
		height: 56,
		borderRadius: 10,
		marginRight: 14,
		backgroundColor: '#f4f0f0',
	},
	cartItemText: {
		justifyContent: 'center',
	},
	cartItemName: {
		color: '#171212',
		fontSize: 16,
		fontWeight: '500',
	},
	cartItemQty: {
		color: '#82686a',
		fontSize: 14,
		marginTop: 2,
	},
	cartItemPrice: {
		color: '#171212',
		fontSize: 16,
		fontWeight: '400',
	},
	summaryBox: {
		backgroundColor: '#fff',
		borderRadius: 12,
		marginHorizontal: 16,
		marginTop: 10,
		marginBottom: 18,
		padding: 16,
		shadowColor: '#000',
		shadowOpacity: 0.03,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 1 },
		elevation: 1,
	},
	summaryRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 6,
	},
	summaryLabel: {
		color: '#82686a',
		fontSize: 15,
	},
	summaryValue: {
		color: '#171212',
		fontSize: 15,
		fontWeight: '400',
		textAlign: 'right',
	},
	checkoutButton: {
		backgroundColor: '#e8b4b7',
		borderRadius: 24,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 16,
		marginTop: 8,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOpacity: 0.04,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 1 },
		elevation: 2,
	},
	checkoutButtonText: {
		color: '#171212',
		fontWeight: 'bold',
		fontSize: 17,
		letterSpacing: 0.2,
	},
});
