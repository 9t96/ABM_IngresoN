using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;

namespace CapaNegocio
{
    public class TerritoryLogic
    {

        public int AgregarUno(Territories nuevoTtr)
        {
            TerritoryDAO ttDao = new TerritoryDAO();

            return ttDao.AddOne(nuevoTtr);
        }

        public List<Territories> TraerTodos()
        {
            TerritoryDAO ttDao = new TerritoryDAO();

            return ttDao.GetAll();
        }
        public int ModificarTerritorio(Territories nuevoTtr)
        {
            TerritoryDAO ttDao = new TerritoryDAO();

            return ttDao.UpdateOne(nuevoTtr);
        }
        public int EliminarTerritorio(Territories nuevoTtr)
        {
            TerritoryDAO ttDao = new TerritoryDAO();

            return ttDao.DeleteOne(nuevoTtr);
        }

        public Territories TraerUno(Territories nuevoTtr)
        {
            TerritoryDAO ttDao = new TerritoryDAO();

            return ttDao.GetByDescription(nuevoTtr);
        }
    }
}
