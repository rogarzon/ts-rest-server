import { Request, Response } from 'express';
import Usuario from '../models/usuarios';


export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();

    res.json({
        usuarios
    });
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg: `No existe usuario con id ${id}`
        })
    }

    res.json({
        usuario
    });
}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    const existeEmail = await Usuario.findOne({
        where: {
            email: body.email
        }
    });

    if (existeEmail)
        return res.status(400).json({
            msg: `Ya existe un usuario con el email ${body.email}`
        });

    try {
        const usuario = await Usuario.create(body);
        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    const usuario = await Usuario.findByPk(id);

    if (!usuario)
        return res.status(404).json({
            msg: `No existe un usuario con id ${id}`
        });

    await usuario.update(body);

    res.json({
       usuario
    });
}

export const deleteUsuario = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: "deleteUsuario",
        id,
    });
}