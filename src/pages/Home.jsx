import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { axiosEcommerce } from "../utils/configAxios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("")
  const [currentCategory, setCurrentCategory] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProductName = e.target.productName.value
    setProductName(newProductName)
  }

  const productsByName = useMemo(() =>{
    return products.filter((product) => product.title.
    toLowerCase().includes(productName.toLocaleLowerCase()))
  }, [productName, products])

  const handleClickCategory = (e) => {
    setCurrentCategory(Number(e.target.dataset.category))

  }


  useEffect(() => {
    axiosEcommerce
      .get("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(currentCategory === 0)
    axiosEcommerce
      .get("products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [currentCategory]);

  useEffect(() => {
    if(currentCategory !== 0)
    axiosEcommerce.get(`products?categoryId=${currentCategory}`)
    .then((res) => setProducts(res.data))
    .catch((err) => console.log(err));
  }, [currentCategory])
  

  return (
    <main className="px-2">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <input className="border-2 w-auto sm:w-[400px] h-12" id="productName" type="text" placeholder="What are you looking for?" />
          <button className="bg-red-500 w-[40px] sm:w-[150px] rounded-sm">
            <i className="bx bx-search text-white"></i>
          </button>
        </div>

        <ul className="grid sm:grid-cols-5  p-4 border-2 font-bold text-center text-red-700 text-xl">
          <li className="cursor-pointer" onClick={handleClickCategory} data-category={0} >All</li>
          {categories.map((category) => (
            <li className="cursor-pointer" onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name}</li>
          ))}
        </ul>
      </form>

      <section className="grid gap-8 py-6 grid-cols-2">
        {productsByName.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Home;
