import Controller from "@/interfaces/controller";
import { Router } from "express";
import { home, star } from "@/routes/index";
import { auth } from "@/middleware/auth";


export default class IndexController implements Controller {
	name: string;
	path: string;
	router: Router;

	constructor() {
		this.name = "Index";
		this.path = "/";
		this.router = Router();
		this.init();
	}

	private init(): void {
		this.router.get("/", home);
		this.router.use('star', (req, res, next) => {
		auth(req, res, next);
  next()
})
	}
}
