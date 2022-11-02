const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const {verificaToken} = require("../middlewares/autenticacion");

app.use(fileUpload());

const Producto = require('../models/producto');

app.get('/productos', (req, res) => {
    Producto.find()
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.render('productos', {
                productos: productos
            });

        });
});

app.get('/producto/ingresar-producto', verificaToken, (req, res) => {
    res.render('ingresar-producto');
});

app.post('/producto/ingresar-producto', (req, res) => {

    let body = req.body;

    const TipoProd = require("../models/tipo-producto");

    tipoProd = TipoProd.find({descripcion: body.cboTipoProducto});

    let producto = new Producto({
        nombre: body.txtNombre,
        tipoProducto: tipoProd,
        descripcion: body.txtDescripcion,
        precio: body.txtPrecio,
        stock: body.nmbStock,
        img: body.cboTipoProducto + '/' + body.flImagen
    });

    console.log(body.cboTipoProducto + '/' + body.flImagen);

    
    /*
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            productoDB
        })

    });
    */
});

module.exports = app;