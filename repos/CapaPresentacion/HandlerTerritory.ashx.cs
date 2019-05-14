using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using CapaDatos;
using Newtonsoft.Json;
using CapaNegocio;
using System.IO;
using System.Web.Services;

namespace CapaPresentacion
{

    public class ObjetoData
    {
        public string Method { get; set; }
        public string TerritoryID { get; set; }
        public int RegionID { get; set; }
        public string TerritoryDescription { get; set; }
    }
    /// <summary>
    /// Descripción breve de HandlerTerritory
    /// </summary>
    public class HandlerTerritory : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            
            if (context.Request.HttpMethod == "POST")
            {
                ObjetoData misDatos = this.DataToObject(context);
                switch (misDatos.Method)
                {
                    case "AgregarUno":
                        this.AgregarUno(context,misDatos);
                        break;
                    case "ModificarUno":
                        this.ModificarUno(context,misDatos);
                        break;
                    case "EliminarUno":
                        this.EliminarUno(context,misDatos);
                        break;
                }

            }
            else
            {
                switch (context.Request["Method"])
                {
                    case "TraerTodos":
                        this.TraerTodos(context);
                        break;
                    case "TraerUno":
                        this.TraerUno(context, context.Request["Data"]);
                        break;
                }


            }
           
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

             
        public void AgregarUno(HttpContext context, ObjetoData data)
        {
            
            TerritoryLogic terriLogic = new TerritoryLogic();
            Territories miTr = new Territories
            {
                RegionID = data.RegionID,
                TerritoryDescription = data.TerritoryDescription,
                TerritoryID = data.TerritoryID
            };
            context.Response.Write(terriLogic.AgregarUno(miTr));
        }
        public void TraerTodos(HttpContext context)
        {
           TerritoryLogic terriLogic = new TerritoryLogic();

           string listTerritorios = this.ToJson(terriLogic.TraerTodos());

           context.Response.Write(listTerritorios);
        }

        public void ModificarUno(HttpContext context, ObjetoData data)
        {
            TerritoryLogic terriLogic = new TerritoryLogic();
            Territories miTr = new Territories
            {
                RegionID = data.RegionID,
                TerritoryDescription = data.TerritoryDescription,
                TerritoryID = data.TerritoryID
            };
            context.Response.Write(terriLogic.ModificarTerritorio(miTr));
        }

        public void EliminarUno(HttpContext context, ObjetoData dataForDelete)
        {
            TerritoryLogic terriLogic = new TerritoryLogic();
            Territories miTr = new Territories
            {
                RegionID = dataForDelete.RegionID,
                TerritoryDescription = dataForDelete.TerritoryDescription,
                TerritoryID = dataForDelete.TerritoryID
            };
            context.Response.Write(terriLogic.EliminarTerritorio(miTr));
        }

        public void TraerUno(HttpContext context, string dataForDelete)
        {
            TerritoryLogic terriLogic = new TerritoryLogic();
            Territories miTr = new Territories
            {

                TerritoryDescription = dataForDelete

            };

                
           string jsonTtory = JsonConvert.SerializeObject(terriLogic.TraerUno(miTr));
            context.Response.Write(jsonTtory);
        }

        public string ToJson(List<Territories> lista)
        {
            var setting = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            string json = JsonConvert.SerializeObject(lista, setting);
            return json;
        }

        public Territories JsonToString(string json)
        {
           Territories converted = JsonConvert.DeserializeObject<Territories>(json);
            return converted;
        }

        public ObjetoData DataToObject(HttpContext context)
        {
            ObjetoData frontData = new ObjetoData();
            string data = new StreamReader(context.Request.InputStream).ReadToEnd();
            var dsrs = new JavaScriptSerializer();
            Dictionary<string, string> values = dsrs.Deserialize<Dictionary<string, string>>(data);
            foreach (var item in values)
            {
                switch (item.Key)
                {
                    case "TerritoryID":
                        frontData.TerritoryID = item.Value;
                        break;
                    case "TerritoryDescription":
                        frontData.TerritoryDescription = item.Value;
                        break;
                    case "RegionID":
                        frontData.RegionID = int.Parse(item.Value);
                        break;
                    case "Method":
                        frontData.Method = item.Value;
                        break;
                }
            }

            return frontData;
        }

    }

}