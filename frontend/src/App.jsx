
import {  Route, Routes } from "react-router-dom"
import Home from "./pages/HomeScreen"
import AppLayout from "./ui/Applayout"
import LoginScreen from "./pages/LoginScreen"
import Product from "./pages/ProductScreen"
import CartScreen from "./pages/CartScreen"
import PageNotFound from "./pages/PageNotFound"
import { Toaster } from "react-hot-toast"
import RegisterScreen from "./pages/RegisterScreen"
import ProtectedRoute from "./ui/ProtectedRoutes"
import ProfileScreen from "./pages/ProfileScreen"
import ShippingScreen from "./pages/ShippingScreen"
import PaymentScreen from "./pages/PaymentScreen"
import PlaceOrderScreen from "./pages/PlaceOrderScreen"



function App() {


  return (
    <>
    <Routes>
      <Route  element={
        <ProtectedRoute>
            <AppLayout />
        </ProtectedRoute>}
      >

      {/* <Route index element={ <Navigate replace to="home"/>} /> */}
      <Route path="/" element={<Home />} />
      
      <Route path="product/:id" element={<Product />} />
      
      <Route path="cart" element={<CartScreen />} />
      <Route path="profile" element={<ProfileScreen/>} />
      <Route path="shipping" element={<ShippingScreen/>}/>
      <Route path="payment" element={<PaymentScreen />} />
      <Route path="placeorder" element={<PlaceOrderScreen />} />
      <Route path="*" element={<PageNotFound />} />
   
      </Route>
      
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
    </Routes>
  <Toaster
                position="bottom-right"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: { duration: 3000 },
                    error: {
                        duration: 3000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-800)",
                        color: "var(--color-grey-700",
                    },
                }}
            />
          
    </>
    
  )
}

export default App
