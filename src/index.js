import "./style/style.scss"
import { Router } from "./script/common/route"
Router.init()

// запускаем главную страницу
Router.dispatch("/")
