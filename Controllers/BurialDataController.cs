using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using intexxxx.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace intexxxx.Controllers
{
    [Route("api/burial-data")]
    [ApiController]
    public class BurialDataController : ControllerBase
    {
        private postgresContext _context;
        public BurialDataController(postgresContext Context)
        {
            _context = Context;
        }

        [HttpGet]
        public IQueryable<BurialData> GetBurialData()
        {
            var query = 
                _context.Burialmain
                .GroupJoin(_context.BurialmainTextile, bm => bm.Id, bt => bt.MainBurialmainid, (bm, btJoin) => new { bm, btJoin})
                .SelectMany(x => x.btJoin.DefaultIfEmpty(), (x, bt) => new { x.bm, bt })
                .GroupJoin(_context.Textile, x => x.bt.MainBurialmainid, t => t.Id, (x, tJoin) => new { x.bm, x.bt, tJoin })
                .SelectMany(x => x.tJoin.DefaultIfEmpty(), (x, t) => new { x.bm, x.bt, t })
                .GroupJoin(_context.StructureTextile, x => x.t.Id, st => st.MainTextileid, (x, stJoin) => new { x.bm, x.bt, x.t, stJoin })
                .SelectMany(x => x.stJoin.DefaultIfEmpty(), (x, st) => new { x.bm, x.bt, x.t, st })
                .GroupJoin(_context.Structure, x => x.st.MainStructureid, s => s.Id, (x, sJoin) => new { x.bm, x.bt, x.t, x.st, sJoin })
                .SelectMany(x => x.sJoin.DefaultIfEmpty(), (x, s) => new { x.bm, x.bt, x.t, x.st, s })
                .GroupJoin(_context.Structure, x => x.st.MainStructureid, s => s.Id, (x, sJoin) => new { x.bm, x.bt, x.t, x.st, sJoin })
                .SelectMany(x => x.sJoin.DefaultIfEmpty(), (x, s) => new { x.bm, x.bt, x.t, x.st, s })
                .GroupJoin(_context.ColorTextile, x => x.t.Id, ct => ct.MainTextileid, (x, ctJoin) => new { x.bm, x.bt, x.t, x.st, x.s, ctJoin })
                .SelectMany(x => x.ctJoin.DefaultIfEmpty(), (x, ct) => new { x.bm, x.bt, x.t, x.st, x.s, ct })
                .GroupJoin(_context.Color, x => x.ct.MainColorid, c => c.Id, (x, cJoin) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, cJoin })
                .SelectMany(x => x.cJoin.DefaultIfEmpty(), (x, c) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, c })
                .GroupJoin(_context.TextilefunctionTextile, x => x.t.Id, tft => tft.MainTextileid, (x, tftJoin) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, tftJoin })
                .SelectMany(x => x.tftJoin.DefaultIfEmpty(), (x, tft) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, tft })
                .GroupJoin(_context.Textilefunction, x => x.tft.MainTextilefunctionid, tf => tf.Id, (x, tfJoin) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, x.tft, tfJoin })
                .SelectMany(x => x.tfJoin.DefaultIfEmpty(), (x, tf) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, x.tft, tf })
                .GroupJoin(_context.BurialmainBodyanalysischart, x => x.bm.Id, bac => bac.MainBurialmainid, (x, bacJoin) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, x.tft, x.tf, bacJoin })
                .SelectMany(x => x.bacJoin.DefaultIfEmpty(), (x, bac) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, x.tft, x.tf, bac })
                .GroupJoin(_context.Bodyanalysischart, x => x.bac.MainBodyanalysischartid, ba => ba.Id, (x, baJoin) => new { x.bm, x.bt, x.t, x.st, x.s, x.ct, x.c, x.tft, x.tf, x.bac, baJoin })
                .SelectMany(x => x.baJoin.DefaultIfEmpty(), (x, ba) => new BurialData
                {
                    Color = x.c.Value,
                    Structure = x.s.Value,
                    Sex = x.bm.Sex,
                    Depth = x.bm.Depth,
                    DeathAge = x.bm.Ageatdeath,
                    HeadDirection = x.bm.Headdirection,
                    SquareNorthSouth = x.bm.Squareeastwest,
                    NorthSouth = x.bm.Northsouth,
                    SquareEastWest = x.bm.Squareeastwest,
                    EastWest = x.bm.Eastwest,
                    Area = x.bm.Area,
                    BurialNumber = x.bm.Burialnumber,
                    HairColor = x.bm.Haircolor,
                    EstimateStature = ba.Estimatestature,
                    BurialMainId = x.bm.Id
                });
            return query;
        }

        [HttpPost]
        public async Task<ActionResult<Burialmain>> AddBurialData(Burialmain newBurialData)
        {
            var burialMain = new Burialmain
            {
                Id = newBurialData.Id,
                Squarenorthsouth = newBurialData.Squarenorthsouth,
                Headdirection = newBurialData.Headdirection,
                Sex = newBurialData.Sex,
                Northsouth = newBurialData.Northsouth,
                Depth = newBurialData.Depth,
                Eastwest = newBurialData.Eastwest,
                Adultsubadult = newBurialData.Adultsubadult,
                Facebundles = newBurialData.Facebundles,
                Southtohead = newBurialData.Southtohead,
                Preservation = newBurialData.Preservation,
                Fieldbookpage = newBurialData.Fieldbookpage,
                Squareeastwest = newBurialData.Squareeastwest,
                Goods = newBurialData.Goods,
                Text = newBurialData.Text,
                Wrapping = newBurialData.Wrapping,
                Haircolor = newBurialData.Haircolor,
                Westtohead = newBurialData.Westtohead,
                Samplescollected = newBurialData.Samplescollected,
                Area = newBurialData.Area,
                Burialid = newBurialData.Burialid,
                Length = newBurialData.Length,
                Burialnumber = newBurialData.Burialnumber,
                Dataexpertinitials = newBurialData.Dataexpertinitials,
                Westtofeet = newBurialData.Westtofeet,
                Ageatdeath = newBurialData.Ageatdeath,
                Southtofeet = newBurialData.Southtofeet,
                Excavationrecorder = newBurialData.Excavationrecorder,
                Photos = newBurialData.Photos,
                Hair = newBurialData.Hair,
                Burialmaterials = newBurialData.Burialmaterials,
                Dateofexcavation = newBurialData.Dateofexcavation,
                Fieldbookexcavationyear = newBurialData.Fieldbookexcavationyear,
                Clusternumber = newBurialData.Clusternumber,
                Shaftnumber = newBurialData.Shaftnumber
            };

            _context.Burialmain.Update(burialMain);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBurialData), new { id = burialMain.Id }, newBurialData);
        }


    }
}
