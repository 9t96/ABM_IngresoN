using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class TerritoryDAO:ITerritory
    {

        public List<Territories> GetAll()
        {
            List<Territories> lst = new List<Territories>();
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                lst = contexto.Territories.Include("Region").Select(trr => trr).ToList();
                return lst;
            }           
        }

        public int AddOne(Territories nuevoTtr)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                contexto.Territories.Add(nuevoTtr);
                try
                {
                    return contexto.SaveChanges();
                }
                catch (Exception)
                {

                    return -1;
                }
            }


        }

        public int UpdateOne(Territories nuevoTtr)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                Territories row = contexto.Territories.Single(terri => terri.TerritoryID == nuevoTtr.TerritoryID);
                try
                {
                    row.TerritoryDescription = nuevoTtr.TerritoryDescription;
                    row.RegionID = nuevoTtr.RegionID;
                    return contexto.SaveChanges();
                }
                catch (Exception)
                {

                    return -1;
                }
            }


        }

        public int DeleteOne(Territories ttfordelete)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                Territories row = contexto.Territories.FirstOrDefault(trr => trr.TerritoryID.Equals(ttfordelete.TerritoryID));
                try
                {
                    contexto.Territories.Remove(row);
                    return contexto.SaveChanges();
                }
                catch (Exception)
                {

                    return -1;
                }
            }
        }

        public Territories GetByDescription(Territories ttparabuscar)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
               Territories row = new Territories();
                row = contexto.Territories.FirstOrDefault(trr => trr.TerritoryDescription.Equals(ttparabuscar.TerritoryDescription));
                return row;
            }
        }
    }
}
