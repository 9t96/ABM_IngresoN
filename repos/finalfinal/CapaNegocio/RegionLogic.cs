using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;

namespace CapaNegocio
{
    public class RegionLogic
    {
        public List<Region> TraerTodos()
        {
            RegionDAO regDao = new RegionDAO();

            return regDao.GetAll();
        }
    }
}
