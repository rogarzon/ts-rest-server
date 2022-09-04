import express, { Application } from 'express';
import userRoutes from '../routes/usuarios';
import cors from 'cors';

import db from '../db/connections';


class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
    }

    constructor() {
      this.app = express();
      this.port = process.env.PORT || '8000';

      this.middlewares();
      this.routes();
      this.dbConnect();
    }

  /**
   * routes
   */
  private routes() {
      this.app.use(this.apiPaths.usuarios, userRoutes);
  }


 /**
  * middlewares
  */
 private middlewares() {
     //cors
     this.app.use(cors());

     //lectura del body
     this.app.use(express.json());

     //carpeta public
     this.app.use(express.static('public'));
 }

    /**
    * listen
    */
     public listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

   /**
    * dbConnect
    */
   private async dbConnect() {
       try {
           await db.authenticate();
           console.log('Database online...');
       } catch (error) {
           console.log(error);
       }
   }

}

export default Server;