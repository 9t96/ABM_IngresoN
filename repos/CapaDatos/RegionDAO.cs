using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class RegionDAO:IRegion
    {
        public List<Region> GetAll()
        {
            List<Region> lst = new List<Region>();
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                lst = contexto.Region.Select(regi => regi).ToList();
                return lst;
            }
        }
    }
}
