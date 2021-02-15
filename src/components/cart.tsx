import React from "react";
import { Link } from "react-router-dom";

const cart = [
    {
        id: 1,
        name: "yeezy 350",
        price: 340,
        quantity: 2,
        images: [
            {
                image_url:
                    "https://stockx.imgix.net/images/adidas-Yeezy-Boost-350-V2-Clay-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1606321232",
            },
        ],
    },
    {
        id: 2,
        name: "yeezy 350",
        price: 340,
        quantity: 2,
        images: [
            {
                image_url:
                    "https://stockx.imgix.net/images/adidas-Yeezy-Boost-350-V2-Clay-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1606321232",
            },
        ],
    },
    {
        id: 3,
        name: "yeezy 350",
        price: 340,
        quantity: 2,
        images: [
            {
                image_url:
                    "https://stockx.imgix.net/images/adidas-Yeezy-Boost-350-V2-Clay-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1606321232",
            },
        ],
    },
];

const ProductCard = () => (
    <div className="flex flex-col my-6">

        <h1 className="text-4xl font-bold">Winkelmand</h1>

        <div className="flex-1">
            <table className="w-full text-sm lg:text-base">
                <thead>
                    <tr className="h-12 ">
                        <th className="hidden md:table-cell"></th>
                        <th className="text-left">Product</th>
                        <th className="hidden text-left md:table-cell">
                            Prijs
                                </th>
                        <th
                            className="lg:text-right text-left pl-5 lg:pl-0"
                        >
                            <span className="lg:hidden" title="Quantity"
                            >Qtd</span
                            >
                            <span className="hidden lg:inline"
                            >Hoeveelheid</span
                            >
                        </th>
                        <th className="text-right">Totaal</th>
                    </tr>
                </thead>
                <tbody> {cart.map((item, i) => {
                    return (<tr>
                        <td className="hidden pb-4 md:table-cell">
                            <a href="#">
                                <img
                                    src={item.images[0].image_url}
                                    className="w-20 rounded"
                                    alt="Thumbnail"
                                />
                            </a>
                        </td>
                        <td>
                            <a href="#">
                                <p className="mb-2 md:ml-4">{item.name}</p>
                                <form action="" method="POST">
                                    <button
                                        type="submit"
                                        className="text-red-700 md:ml-4"
                                    >
                                        <small>Verwijderen</small>
                                    </button>
                                </form>
                            </a>
                        </td>
                        <td className="hidden text-left md:table-cell">
                            <span
                                className="text-sm lg:text-base font-medium"
                            >
                                €{item.price}
                            </span>
                        </td>
                        <td
                            className="justify-center md:justify-end md:flex mt-6"
                        >
                            <div className="w-20 h-10">
                                <div
                                    className="relative flex flex-row w-full h-8 items-center"
                                >
                                    <div className="bg-white rounded border-gray-2 mr-2 w-4 h-4 flex items-center justify-center">-</div>{item.quantity}<div className="bg-white rounded border-gray-2 ml-2 w-4 h-4 flex items-center justify-center">+</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-right">
                            <span
                                className="text-sm lg:text-base font-medium"
                            >
                                {item.price * item.quantity}
                            </span>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
            <div className="my-4 mt-5 -mx-2 lg:flex">
                <div className="lg:px-2 lg:w-1/2">
                </div>
                <div className="lg:px-2 lg:w-1/2">

                    <div className="p-4">

                        <div className="flex justify-between pt-4">
                            <div
                                className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800"
                            >
                                Total
                                    </div>
                            <div
                                className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900"
                            >
                                17,859.3€
                                    </div>
                        </div>
                        <a href="#">
                            <button
                                className="flex justify-center w-full px-10 py-4 mt-6 font-medium text-white  bg-gray-800 rounded-xl shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                            >
                                <span className="ml-2 mt-5px"
                                >Afrekenen</span
                                >
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ProductCard;
