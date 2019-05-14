using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    interface ITerritory
    {
        List<Territories> GetAll();
        int AddOne(Territories nuevoTtr);
        int UpdateOne(Territories nuevoTtr);
        int DeleteOne(Territories ttfordelete);
        Territories GetByDescription(Territories ttparabuscar);
    }
}
