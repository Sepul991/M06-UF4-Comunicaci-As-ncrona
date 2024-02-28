import { Router } from 'express'
import {Controller} from '../controlador/Controller.js'
export const router = Router();

router.get('/',Controller.show)