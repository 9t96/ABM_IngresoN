using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CapaDatos;
using CapaNegocio;

namespace CapaPresentacion
{
    /// <summary>
    /// Summary description for HandlerRegion
    /// </summary>
    public class HandlerRegion : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string respuesta;
            context.Response.ContentType = "application/json";
            if (context.Request.HttpMethod == "GET")
            {
                respuesta = this.TraerRegiones();
                context.Response.Write(respuesta);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public string TraerRegiones()
        {
            RegionLogic region = new RegionLogic();
            return this.ToJson(region.TraerTodos());
        }

        public string ToJson(List<Region> lista)
        {
            var setting = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            string json = JsonConvert.SerializeObject(lista, setting);
            return json;
        }
    }
}