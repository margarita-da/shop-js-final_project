import Home from "../../templates/pages/home.hbs"
import Catalog from "../../templates/pages/catalog.hbs"
import Cart from "../../templates/pages/cart.hbs"
import About from "../../templates/pages/about.hbs"
import Contacts from "../../templates/pages/contacts.hbs"
import Forthy from "../../templates/pages/404.hbs"


    // let router = new Router();
    const $root = document.querySelector('#root')
    const HomeHTML = Home()
    const CatalogHTML = Catalog()
    const CartHTML = Cart()
    const AboutHTML = About()
    const ContactsHTML = Contacts()
    const ForthyHTML = Forthy()


// `класс` роутера
export let Router = {

    // маршруты и соответствующие им обработчики
    // routes: {
    //     "/": "index",
    //     "/article/:id/:author": "article",
    //     "/company/:name/post/:id": "company_blog",
    // },
    routes: {
        "/": "home",
        "/catalog": "catalog",
        "/about": "about",
        "/contacts": "contacts",
        "/cart": "cart",
        "/404": "404",
    },

    // метод проходиться по массиву routes и создает
    // создает объект на каждый маршрут
    init: function() {
       
        // объявляем свойство _routes
        this._routes = [];
        for( let route in this.routes ) {
   
            // имя метода-обрботчика
            let method = this.routes[route];
           
            // добавляем в массив роутов объект
            this._routes.push({
               
                // регулярное выражение с которым будет сопоставляться ссылка
                // ее надо преобразовать из формата :tag в RegEx
                // модификатор g обязателен
                pattern: new RegExp('^' + route.replace(/:\w+/g,'(\\w+)') + '$'),
               
                // метод-обработчик
                // определяется в объекте Route
                // для удобства
                callback: this[method]
            });

        }

    },
   
   
   
    dispatch: function(path) {
       
        // количество маршрутов в массиве
        var i = this._routes.length;
       
        // цикл до конца
        while( i-- ) {
           
            // если запрошенный путь соответствует какому-либо
            // маршруту, смотрим есть ли маршруты
            var args = path.match(this._routes[i].pattern);
           
            // если есть аргументы
            if( args ) {
               
                // вызываем обработчик из объекта, передавая ему аргументы
                // args.slice(1) отрезает всю найденную строку
                this._routes[i].callback.apply(this,args.slice(1))
            }
        }
    },


    // обработчик
    // главной страницы
    home: function() {
        $root.innerHTML = HomeHTML
    },

    // каталог
    catalog: function() {
        $root.innerHTML = CatalogHTML

    },
    // корзина
    cart: function() {
        $root.innerHTML = CartHTML
    },

    // О нас
    about: function() {
        $root.innerHTML = AboutHTML

    },

    // корзина
    contacts: function() {
        $root.innerHTML = ContactsHTML
    },

    // О нас
    404: function() {
        $root.innerHTML = ForthyHTML

    },
   
    // контроллер блога компаний
    // company_blog: function(name,id) {
    //     console.log(`Artwork #${name}, comment #${id}`)
    // }

}