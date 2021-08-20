// == Import : npm
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import './style.scss';
import { priceFormatted } from "../../../utils/tools";
import imgPlaceholder from '../../../assets/images/imageFake.webp';

const Products = ({
    getProducts,
    categories,
    products,
    userData,
    updateProducerProducts,
    setProducerProducts,
    addProduct,
    removeProduct,
    setIsWaitingProductFormValidation,
    isWaitingProductsFormValidation,
    isProductsFormValidationError,
    setIsProductFormValidationError,
    setIsProductFormValidated,
    isProductsFormValidated
}) => {

    const [category, setCategory] = useState(''); // Correspond à la catégorie sélectionné (dans le formulaire d'ajout d'un produit)
    const [product, setProduct] = useState({}); // Correspond aux informations du produit sélectionné (dans le formulaire d'ajout d'un produit)
    const [price, setPrice] = useState(''); // Correspond au prix du produit (dans le formulaire d'ajout d'un produit)
    const [measure, setMeasure] = useState('kg'); // Correspond a l'unité de mesure du prix du produit (dans le formulaire d'ajout d'un produit)
    const [description, setDescription] = useState(''); // Correspond à la description du produit (dans le formulaire d'ajout d'un produit)
    const [productDetail, setProductDetail] = useState(''); // Correspond au dernier détail ajouté au produit (dans le formulaire d'ajout d'un produit)
    const [productDetailsList, setProductDetailsList] = useState([]); // Contient tout les détails du produit (affiché dans le formulaire d'ajout d'un produit)
    const [isFormError, setIsFormError] = useState(false); // Indique si le formulaire d'ajout du produit contient une erreur

    /**
     * Au montage du composant, récupère la liste de tout les produits qu'il est possible d'ajouter (getProducts())
     * et défini la valeur de la propriété "producerProducts" du "state" du "reducer" "dashboard" pour que cette dernière
     * contienne la liste des produits dont dispose à ce moment le producteur (setProducerProducts(userData.products)).
     */
    useEffect(() => {
        getProducts();
        setProducerProducts(userData.products);
    }, []);

    /**
     * Lors d'un changement de catégorie (category), la valeur de la variable "product" est réinitialisé.
     */
    useEffect(() => {
        setProduct({});
    }, [category]);

    /**
     * Lors d'un changement de la de la variable "isProductsFormValidated" et si cette dernière vaut "true"
     * alors les valeurs liées au formulaire d'ajout d'un produit sont réinitialisé et le message indiquant
     * le succés de l'ajout en base de données disparaît au bout de 5 secondes.
     */
    useEffect(() => {
        if (isProductsFormValidated) {
            setCategory('');
            setProduct({});
            setPrice('');
            setMeasure('kg');
            setProductDetailsList([]);
            setDescription('');
            setTimeout(() => setIsProductFormValidated(false), 5000);
        }
    }, [isProductsFormValidated]);

    /**
     * Fonction se déclanchant lors du clique sur le bouton permettant d'ajouter un détail (dans le formulaire d'ajout d'un produit).
     * La variable contenant les détails du produit à ajouter est mise à jour avec la nouvelle valeur (setProductDetailsList) et la
     * variable qui contient le détail nouvellement ajouté est réinitialisé (productDetail).
     */
    const handleAddProductDetail = () => {
        setProductDetailsList(prevState => ([...prevState, productDetail]));
        setProductDetail('');
    };

    /**
     * Fonction se déclanchant lors du clique sur le bouton permettant de supprimer un détail (dans le formulaire d'ajout d'un produit).
     * La variable contenant les détails du produit à ajouter est mise à jour (setProductDetailsList) avec un tableau dont à été retiré le détail à supprimer.
     * @param e
     */
    const handleRemoveProductDetail = (e) => {
        const detailToRemove = e.currentTarget.value;
        const productDetailsListFiltered = productDetailsList.filter(detail => detail !== detailToRemove);
        setProductDetailsList(productDetailsListFiltered);
    };

    /**
     *  Fonction se déclanchant lors du clique sur le bouton permettant d'ajouter un produit (dans le formulaire d'ajout d'un produit).
     *  Le produit est ajouté à la propriété "producerProducts" du "state" du "reducer" "dashboard" qui contient la liste des produits
     *  du producteur via l'action "addProduct".
     */
    const handleOnClickAddProductButton = () => {
        if (category !== '' && product._id && price !== '0' && !isNaN(parseInt(price, 10))) {
            setIsFormError(false);
            addProduct({
                id: `${Date.now()}_${product._id}`,
                category: product.category,
                imageUrl: product.imageUrl,
                name: product.name,
                price,
                measure,
                details: productDetailsList,
                description
            });
        } else {
            setIsFormError(true);
        }
    };

    /**
     * Fonction se déclanchant lors de la soumission du formulaire d'ajout d'un produit.
     * L'action "updateProducerProducts" va être interceptée par le middleware "Dashboard".
     * @param e
     */
    const handleSubmitAddProductForm = (e) => {
        e.preventDefault();
        if (!isFormError) {
            setIsWaitingProductFormValidation(true);
            updateProducerProducts();
        }
    };

    /**
     * Fonction se déclanchant lors du clique sur le bouton permettant de supprimer un produit (dans le formulaire de la "carte" représentant le produit).
     * Le produit est retiré, de la propriété "producerProducts" du "state" du "reducer" "dashboard" qui contient la liste des produit du producteur, via
     * l'action "removeProduct".
     * @param e
     */
    const handleOnClickRemoveProductButton = (e) => {
        const productToRemove = e.currentTarget.value;
        const productsListFiltered = userData.products.filter(product => product.id !== productToRemove);
        removeProduct(productsListFiltered);
    };

    /**
     * Fonction se déclanchant lors de la soumission du formulaire de suppression d'un produit (présent dans la "carte" représentant le produit).
     * L'action "updateProducerProducts" va être interceptée par le middleware "Dashboard".
     * @param e
     */
    const handleSubmitRemoveProductForm = (e) => {
        e.preventDefault();
        updateProducerProducts();
    };

    /**
     * Permet d'afficher une "carte" représentant un produit.
     * @param product - Données d'un produit, de la liste des produits du producteur.
     * @returns {JSX.Element}
     */
    const displayProduct = (product) => {
        return (
            <form className={'dashboard_products_list_container_item'} key={product.id} onSubmit={handleSubmitRemoveProductForm}>
                <div className={'dashboard_products_list_container_item_productImg'}>
                    <img
                        src={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
                        alt={'Représentation du produit'}
                        loading={'lazy'}
                    />
                </div>
                <div className={'dashboard_products_list_container_item_productInfo'}>
                    <p className={'dashboard_products_list_container_item_productInfo_name'}>{product.name}</p>
                    <p className={'dashboard_products_list_container_item_productInfo_price'}>{priceFormatted(product.price)} / {product.measure}</p>
                    {product.details.length !== 0 &&
                    <div className={'dashboard_products_list_container_item_productInfo_details'}>
                        <p>Détails du produit :</p>
                        <ul>
                            {product.details.map(detail => {
                                return <li key={detail}>- {detail}</li>
                            })}
                        </ul>
                    </div>
                    }
                    {product.description.length !== 0 &&
                    <div className={'dashboard_products_list_container_item_productInfo_description'}>
                        <p>Description :</p>
                        <p>{product.description}</p>
                    </div>
                    }
                </div>
                <button
                    className={'dashboard_products_list_container_item_removeButton'}
                    type={'submit'}
                    value={product.id}
                    onClick={handleOnClickRemoveProductButton}
                >
                    Supprimer
                </button>
            </form>
        );
    };

    return (
        <div className={'dashboard_products'}>
            <div className={'dashboard_products_add'}>
                <h3>Ajouter un produit</h3>
                <div className={'dashboard_products_add_card'}>
                    <div className={'dashboard_products_add_card_productImg'}>
                        <img
                            src={Object.entries(product).length !== 0 ? `${process.env.REACT_APP_API_URL}${product.imageUrl}` : imgPlaceholder}
                            alt={'Représentation du produit'}
                            loading={'lazy'}
                        />
                    </div>
                    <form
                        className={'dashboard_products_add_card_form'}
                        onSubmit={handleSubmitAddProductForm}
                    >
                        <select
                            className={'dashboard_products_add_card_form_select'}
                            name={'category'}
                            value={category}
                            onChange={() => {}}
                        >
                            <option value={''} onClick={() => setCategory('')}>Sélectionner une catégorie</option>
                            {userData.categories && categories.map(category => {
                                if (userData.categories.includes(category._id)) return <option key={category._id} value={category._id} onClick={() => setCategory(category._id)}>{category.name}</option>
                            })}
                        </select>
                        <select
                            className={'dashboard_products_add_card_form_select'}
                            name={'product'}
                            disabled={category === ''}
                        >
                            <option value={''} onClick={() => setProduct({})}>Sélectionner un type</option>
                            {products.map(product => {
                                if (product.category === category) return <option key={product._id} value={product._id} onClick={() => setProduct(product)}>{product.name}</option>
                            })}
                        </select>
                        <div className={'dashboard_products_add_card_form_priceContainer'}>
                            <input
                                name={'price'}
                                type={'number'}
                                placeholder={"Prix (€)"}
                                step={0.1}
                                value={price}
                                onChange={e => setPrice(e.currentTarget.value)}
                            />
                            <select name={'measure'} value={measure} onChange={() => {}}>
                                <option value={'kg'} onClick={() => setMeasure('kg')}>Kg</option>
                                <option value={'pcs'} onClick={() => setMeasure('pcs')}>Pcs</option>
                            </select>
                        </div>
                        <div className={'dashboard_products_add_card_form_detailsContainer'}>
                            <ul>
                                {productDetailsList.map(detail => {
                                    return <li key={detail}>
                                        {detail}
                                        <button
                                            type={'button'}
                                            value={detail}
                                            onClick={handleRemoveProductDetail}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </li>
                                })}
                            </ul>
                            <label>Ajouter un détail</label>
                            <input
                                name={'details'}
                                id={'details'}
                                type={'text'}
                                placeholder={'Exemple: Label, Affinage, etc'}
                                value={productDetail}
                                onChange={e => setProductDetail(e.currentTarget.value)}
                            />
                            <button type={'button'} onClick={handleAddProductDetail}>
                                Ajouter un détail
                            </button>
                        </div>
                        <textarea
                            className={'dashboard_products_add_card_form_textarea'}
                            placeholder={'Description du produit (maximum 250 caractères).'}
                            maxLength={250}
                            rows={6}
                            value={description}
                            onChange={e => setDescription(e.currentTarget.value)}
                        />
                        <button
                            className={'dashboard_products_add_card_form_addButton'}
                            type={'submit'}
                            onClick={handleOnClickAddProductButton}
                        >
                            {isWaitingProductsFormValidation
                                ? <div className={'spinnerLoader'}/>
                                : 'Ajouter'
                            }
                        </button>
                        {isFormError &&
                            <div className={'dashboard_products_add_card_form_message'} onClick={() => setIsFormError(false)}>
                                <p className={'error'}>
                                    Veuillez indiquer, au moins :
                                    <br/>La catégorie du produit
                                    <br/>Le type du produit
                                    <br/>Le prix du produit
                                </p>
                            </div>
                        }
                        {isProductsFormValidationError &&
                            <div className={'dashboard_products_add_card_form_message'} onClick={() => setIsProductFormValidationError(false)}>
                                <p className={'error'}>Une erreur est survenue, veuillez éssayer à nouveau ou contactez un administrateur.</p>
                            </div>
                        }
                        {isProductsFormValidated &&
                            <div className={'dashboard_products_add_card_form_message'} onClick={() => setIsProductFormValidated(false)}>
                                <p className={'valid'}>Votre produit à bien été ajouté.</p>
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className={'dashboard_products_list'}>
                <h3>Gérer mes produits</h3>
                <div className={'dashboard_products_list_container'}>
                    {userData && userData.products.map(product => displayProduct(product))}
                </div>
            </div>
        </div>
    );
};
export default Products;
