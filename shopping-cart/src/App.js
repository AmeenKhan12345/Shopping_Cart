import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';

function App() {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Adidas T-Shirt', price: 1499, image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/01915e1dc62c489c8358acfb01561e08_9366/adidas_Sportswear_Future_Icons_Logo_Graphic_Tee_Black_H39747_01_laydown.jpg' },
        { id: 2, name: 'Puma Shoes', price: 1699, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/398846/02/fnd/IND/fmt/png/Speedcat-OG-Unisex-Sneakers' },
        { id: 3, name: 'Samsung-Galaxy-S23', price: 111799, image: 'https://rukminim2.flixcart.com/image/720/864/xif0q/mobile/t/0/g/-original-imah4zp7fvqp8wev.jpeg?q=60&crop=false' },
        { id: 4, name: 'Skybag', price: 1499, image: 'https://skybags.co.in/cdn/shop/files/SkybagsTRIBE03.png?v=1705671302' },
        { id: 5, name: 'LG Refrigerator', price: 22499, image: 'https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-t422vpzx_epzzebn_eail_in_c/GL-T422VPZX_EPZZEBN_EAIL_IN_C-450x450.jpg' },
        { id: 6, name: 'Rayban Sunglass', price: 299, image: 'https://optorium.in/cdn/shop/files/Ray_Ban_2140_129433_Sunglass_images_01_92af535f-0141-4c7a-8dea-fab2c5609577.jpg?v=1717418193&width=2048' },
    ]);

    const [cartCourses, setCartCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');

    const addCourseToCartFunction = (GFGcourse) => {
        const alreadyCourses = cartCourses
            .find(item => item.product.id === GFGcourse.id);
        if (alreadyCourses) {
            const latestCartUpdate = cartCourses.map(item =>
                item.product.id === GFGcourse.id ? { 
                    ...item, quantity: item.quantity + 1 } 
                : item
            );
            setCartCourses(latestCartUpdate);
        } else {
            setCartCourses([...cartCourses, { product: GFGcourse, quantity: 1 }]);
        }

        // Scroll to the bottom of the page (html element)
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth', // For smooth scrolling effect
        });
    };

    const deleteCourseFromCartFunction = (GFGCourse) => {
        const updatedCart = cartCourses
            .filter(item => item.product.id !== GFGCourse.id);
        setCartCourses(updatedCart);
    };

    const totalAmountCalculationFunction = () => {
        return cartCourses
            .reduce((total, item) => 
                total + item.product.price * item.quantity, 0);
    };

    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };

    const filterCourseFunction = courses.filter((course) =>
        course.name.toLowerCase().includes(searchCourse.toLowerCase())
    );

    return (
        <div className="App">
            <SearchComponent searchCourse={searchCourse} 
                             courseSearchUserFunction={courseSearchUserFunction} />
            <main className="App-main">
                <ShowCourseComponent
                    courses={courses}
                    filterCourseFunction={filterCourseFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                />
                <UserCartComponent
                    cartCourses={cartCourses}
                    deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                    totalAmountCalculationFunction={totalAmountCalculationFunction}
                    setCartCourses={setCartCourses}
                />
            </main>
        </div>
    );
}

export default App;
