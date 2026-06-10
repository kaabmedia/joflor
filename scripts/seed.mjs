import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var");
  process.exit(1);
}

const client = createClient({
  projectId: "4vf75z4g",
  dataset: "production",
  apiVersion: "2026-05-15",
  token,
  useCdn: false,
});

/* helpers */
const ls = (nl, en) => ({ _type: "localeString", nl, en });
const lt = (nl, en) => ({ _type: "localeText", nl, en });
const img = (url, alt, fallback) => ({ _type: "mediaImage", url, alt, fallback });
const head = (style, pre, accent, post) => ({
  _type: "headingParts",
  style,
  ...(pre ? { pre } : {}),
  ...(accent ? { accent } : {}),
  ...(post ? { post } : {}),
});
const cta = (label, href, style) => ({ _type: "ctaButton", label, href, style });
const ref = (id) => ({ _type: "reference", _ref: id });
const keyed = (arr) => arr.map((o, i) => ({ _key: `k${i}`, ...o }));

const docs = [];

/* ---------- siteSettings ---------- */
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  phone: "+31 6 535 909 80",
  phoneHref: "+31653590980",
  email: "info@jovaplant.nl",
  addressLine1: "Lange Broekweg 60",
  postalCity: "2671 DW Naaldwijk",
  country: ls("Nederland", "The Netherlands"),
  mapsUrl: "https://maps.google.com/?q=Lange+Broekweg+60,+2671+DW+Naaldwijk",
  footerIntro: lt(
    "Phalaenopsis kwekerij, gespecialiseerd in het verven van orchideeën. Jaarrond kwaliteit vanuit Naaldwijk, het Westland.",
    "Phalaenopsis nursery, specialised in dyeing orchids. Year round quality from Naaldwijk, the Westland."
  ),
  mpsLogoUrl: "https://joflor.nl/img/mps.png",
  copyright: ls("© 2026 Joflor · Alle rechten voorbehouden", "© 2026 Joflor · All rights reserved"),
  credit: ls("Design en realisatie door Kaabmedia", "Design and development by Kaabmedia"),
});

/* ---------- modellen ---------- */
docs.push(
  {
    _id: "model-boog",
    _type: "model",
    order: 1,
    tagje: ls("Model 1", "Model 1"),
    name: ls("Boog", "Arch"),
    description: lt(
      "Sierlijk gebogen takken die samen een elegante boog vormen.",
      "Gracefully curved stems that together form an elegant arch."
    ),
    image: img("https://joflor.nl/img/sort1.jpg", "Phalaenopsis boogmodel", "Boog"),
  },
  {
    _id: "model-tmodel",
    _type: "model",
    order: 2,
    tagje: ls("Model 2", "Model 2"),
    name: ls("T-model", "T-model"),
    description: lt(
      "Strak en grafisch opgebonden, een moderne verschijning.",
      "Tied up clean and graphic, a modern appearance."
    ),
    image: img("https://joflor.nl/img/sort2.jpg", "Phalaenopsis T-model", "T-model"),
  },
  {
    _id: "model-waterval",
    _type: "model",
    order: 3,
    tagje: ls("Model 3", "Model 3"),
    name: ls("Waterval", "Waterfall"),
    description: lt(
      "Rijk bloeiende takken die naar beneden vloeien.",
      "Richly flowering stems flowing downwards."
    ),
    image: img("https://joflor.nl/img/sort3.jpg", "Phalaenopsis waterval", "Waterval"),
  },
  {
    _id: "model-cascade",
    _type: "model",
    order: 4,
    tagje: ls("Model 4", "Model 4"),
    name: ls("Cascade", "Cascade"),
    description: lt(
      "Trapsgewijs vallende bloemtakken met veel volume.",
      "Tiered, falling flower stems with plenty of volume."
    ),
    image: img("https://joflor.nl/img/sort4.jpg", "Phalaenopsis cascade", "Cascade"),
  },
  {
    _id: "model-1en2tak",
    _type: "model",
    order: 5,
    tagje: ls("Model 5", "Model 5"),
    name: ls("1 en 2 tak", "1 and 2 stems"),
    description: lt(
      "De klassieker, leverbaar met één of twee takken.",
      "The classic, available with one or two stems."
    ),
    image: img("https://joflor.nl/img/sort5.jpg", "Phalaenopsis met een of twee takken", "1 en 2 tak"),
  }
);

/* ---------- certificaten ---------- */
docs.push(
  {
    _id: "cert-mps-abc",
    _type: "certificate",
    order: 1,
    title: "MPS ABC",
    description: lt(
      "Status A+. Registratie van het gebruik van gewasbeschermingsmiddelen, meststoffen, energie en water.",
      "Status A+. Registration of the use of crop protection products, fertilisers, energy and water."
    ),
    pdfUrl: "https://joflor.nl/img/certificaat%20mps%20abc.pdf",
    chipLabel: ls("MPS ABC · status A+", "MPS ABC · status A+"),
  },
  {
    _id: "cert-tracecert",
    _type: "certificate",
    order: 2,
    title: "MPS Florimark TraceCert",
    description: lt(
      "Borging van traceerbaarheid in de keten, van kwekerij tot afnemer.",
      "Assurance of traceability in the chain, from nursery to customer."
    ),
    pdfUrl: "https://joflor.nl/img/1859%20Cer.%20Def.%20TraceCert.pdf",
    chipLabel: ls("MPS Florimark TraceCert", "MPS Florimark TraceCert"),
  },
  {
    _id: "cert-coc",
    _type: "certificate",
    order: 3,
    title: "GLOBALG.A.P. Chain of Custody",
    description: lt(
      "Internationale standaard voor herkomst en integriteit van het product in de handelsketen.",
      "International standard for origin and integrity of the product in the trade chain."
    ),
    pdfUrl: "https://joflor.nl/img/certificaat%20coc.pdf",
    chipLabel: ls("GLOBALG.A.P. Chain of Custody", "GLOBALG.A.P. Chain of Custody"),
  }
);

/* ---------- personen ---------- */
docs.push(
  {
    _id: "person-john",
    _type: "person",
    order: 1,
    name: "John",
    initial: "J",
    role: ls("Eigenaar", "Owner"),
    phone: "+31 6 535 909 80",
    phoneHref: "+31653590980",
    email: "info@jovaplant.nl",
  },
  {
    _id: "person-johnno",
    _type: "person",
    order: 2,
    name: "Johnno",
    initial: "J",
    role: ls("Contactpersoon", "Contact person"),
    phone: "+31 6 21 32 18 70",
    phoneHref: "+31621321870",
  },
  {
    _id: "person-prisca",
    _type: "person",
    order: 3,
    name: "Prisca",
    initial: "P",
    role: ls("Contactpersoon", "Contact person"),
    phone: "+31 6 488 285 36",
    phoneHref: "+31648828536",
  }
);

/* ---------- seizoenen ---------- */
docs.push(
  { _id: "season-feb", _type: "season", order: 1, month: ls("Februari", "February"), title: ls("Valentijnsdag", "Valentine's Day"), description: lt("Romantische kleuren en cadeauklare presentatie.", "Romantic colours and a gift ready presentation.") },
  { _id: "season-maart", _type: "season", order: 2, month: ls("Maart", "March"), title: ls("Vrouwendag", "Women's Day"), description: lt("Een attent gebaar in een passend jasje.", "A thoughtful gesture in a fitting design.") },
  { _id: "season-voorjaar", _type: "season", order: 3, month: ls("Voorjaar", "Spring"), title: ls("Pasen", "Easter"), description: lt("Frisse voorjaarstinten voor het paasschap.", "Fresh spring shades for the Easter shelf.") },
  { _id: "season-mei", _type: "season", order: 4, month: ls("Mei", "May"), title: ls("Moederdag", "Mother's Day"), description: lt("De klassieker onder de cadeauplanten.", "The classic among gift plants.") },
  { _id: "season-dec", _type: "season", order: 5, month: ls("December", "December"), title: ls("Kerst", "Christmas"), description: lt("Warme, feestelijke creaties voor de wintermaanden.", "Warm, festive creations for the winter months.") }
);

/* ---------- HOME ---------- */
docs.push({
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: ls("Phalaenopsis kwekerij · Naaldwijk, Westland", "Phalaenopsis nursery · Naaldwijk, Westland"),
  heroTitleLine1: ls("Wit is ons canvas.", "White is our canvas."),
  heroTitle: head("dye", null, ls("Kleur", "Colour"), ls("is ons vak.", "is our craft.")),
  heroLede: lt(
    "Joflor kweekt en verft Phalaenopsis met toegevoegde waarde. Een stijlicoon met een elegante en chique uitstraling, in verrassende kleuren en vernieuwde creaties, jaarrond geleverd vanuit het Westland.",
    "Joflor grows and dyes Phalaenopsis with added value. A style icon with an elegant and chic appearance, in surprising colours and renewed creations, delivered year round from the Westland."
  ),
  heroPrimaryCta: cta(ls("Bekijk de collectie", "View the collection"), "/collectie", "ink"),
  heroSecondaryCta: cta(ls("Plan een showroombezoek", "Plan a showroom visit"), "/showroom", "ghost"),
  heroMainImage: img("https://images.unsplash.com/photo-1768368052646-a6185df478c1?auto=format&fit=crop&w=1200&q=80", "Witte Phalaenopsis in bloei", "Phalaenopsis"),
  heroMainCaption: ls("Witte basis", "White base"),
  heroSideImage: img("https://images.unsplash.com/photo-1775405298622-3d8d2977dd02?auto=format&fit=crop&w=700&q=80", "Geverfde Phalaenopsis in dieproze", "Wonder Pink"),
  heroSideCaption: ls("Geverfd", "Dyed"),
  marquee: ["Wonder Pink", "Magic Blue", "Boog", "Cascade", "Waterval", "T-model", "1 en 2 tak", "Keramiek"],
  stats: keyed([
    { _type: "statItem", value: 5, label: lt("plantmodellen, van boog tot cascade", "plant models, from arch to cascade") },
    { _type: "statItem", value: 52, label: lt("weken per jaar leverbaar in topkwaliteit", "weeks a year available in top quality") },
    { _type: "statItem", value: 3, label: lt("internationale certificeringen", "international certifications") },
    { _type: "statItem", value: 100, suffix: "%", label: lt("milieuvriendelijke verf in ons verfproces", "environmentally friendly dye in our process") },
  ]),
  collectionEyebrow: ls("De collectie", "The collection"),
  collectionHeading: head("italic", ls("Eén plant,", "One plant,"), ls("eindeloos", "countless"), ls("veel gezichten", "faces")),
  collectionLinkLabel: ls("Naar de volledige collectie", "Go to the full collection"),
  featuredModels: keyed([ref("model-boog"), ref("model-cascade"), ref("model-waterval"), ref("model-tmodel")]),
  procesEyebrow: ls("Het verfproces", "The dyeing process"),
  procesHeading: head("dye", ls("Van witte basis naar een", "From a white base to a"), ls("kleurrijk", "colourful"), ls("stijlicoon", "style icon")),
  procesLede: lt(
    "Bij Joflor draait alles om planten met toegevoegde waarde. Drie stappen bepalen onze kwaliteit.",
    "At Joflor everything revolves around plants with added value. Three steps define our quality."
  ),
  procesImage: img("https://images.unsplash.com/photo-1639374593182-88b49b80a688?auto=format&fit=crop&w=1000&q=80", "Witte Phalaenopsis tegen een donkere achtergrond", "Het verfproces"),
  procesImageCaption: ls("Van wit naar kleur", "From white to colour"),
  procesSteps: keyed([
    { _type: "stepItem", nr: "01", title: ls("Witte basis", "White base"), text: lt("Als basismateriaal gebruiken wij witte Phalaenopsis van verschillende vaste kwekerijen. Zo kunnen wij jaarrond de beste kwaliteit leveren.", "As base material we use white Phalaenopsis from several trusted nurseries. This allows us to deliver the best quality all year round.") },
    { _type: "stepItem", nr: "02", title: ls("Kleur en creatie", "Colour and creation"), text: lt("In ons eigen verfproces krijgt elke plant zijn kenmerkende kleur. Wij werken uitsluitend met milieuvriendelijke verf en vernieuwen de creaties continu.", "In our own dyeing process every plant receives its distinctive colour. We work exclusively with environmentally friendly dye and continuously renew our creations.") },
    { _type: "stepItem", nr: "03", title: ls("Opkweek en levering", "Cultivation and delivery"), text: lt("Afhankelijk van het groeistadium staan de planten drie weken tot vier maanden bij ons. Door koeling blijft de kwaliteit ook in warme zomers behouden.", "Depending on the growth stage, plants stay with us for three weeks to four months. Cooling preserves their quality, even in warm summers.") },
  ]),
  procesCtaLabel: ls("Lees ons verhaal", "Read our story"),
  bannerEyebrow: ls("Showroom · Naaldwijk", "Showroom · Naaldwijk"),
  bannerHeading: head("italic", ls("Bekijk het volledige assortiment", "Experience the full assortment"), ls("in het echt", "in person"), null),
  bannerImage: img("https://joflor.nl/img/showroom2.jpg", "De showroom van Joflor met het volledige assortiment", "Showroom Joflor"),
  bannerCtaLabel: ls("Plan een bezoek", "Plan a visit"),
  certEyebrow: ls("Gecertificeerd duurzaam", "Certified sustainable"),
  certHeading: ls("Milieu, mens en maatschappij geborgd", "Environment, people and society assured"),
  certLinkLabel: ls("Alle certificaten", "All certificates"),
  certExtraChips: keyed([ls("Biologische gewasbescherming", "Biological crop protection"), ls("Milieuvriendelijke verf", "Environmentally friendly dye")]),
});

/* ---------- OVER ONS ---------- */
docs.push({
  _id: "aboutPage",
  _type: "aboutPage",
  heroEyebrow: ls("Over ons", "About us"),
  heroTitleLine1: ls("Geworteld in", "Rooted in"),
  heroTitle: head("dye", ls("het", "the"), ls("Westland", "Westland"), null),
  heroLede: lt("Joflor is gespecialiseerd in het verven van de Phalaenopsis en groeit fors. Vakmanschap, vernieuwing en duurzaamheid komen hier samen onder één glazen dak.", "Joflor specialises in dyeing Phalaenopsis and is growing rapidly. Craftsmanship, innovation and sustainability come together here under one glass roof."),
  storyEyebrow: ls("Het verhaal", "The story"),
  storyHeading: ls("Al jaren met plezier in de Phalaenopsis", "Years of passion for the Phalaenopsis"),
  storyImage: img("https://joflor.nl/img/john.jpg", "John Valstar, eigenaar van Joflor", "John Valstar"),
  storyImageCaption: ls("John Valstar · eigenaar", "John Valstar · owner"),
  storyParagraphs: keyed([
    lt("John Valstar is de eigenaar van Joflor. Hij werkt al jaren met veel plezier in de Phalaenopsis en bouwde het bedrijf uit tot een specialist in geverfde orchideeën met een herkenbaar eigen gezicht.", "John Valstar is the owner of Joflor. He has worked in Phalaenopsis with great pleasure for years and built the company into a specialist in dyed orchids with a recognisable identity of its own."),
    lt("Als basismateriaal gebruikt Joflor witte Phalaenopsis, afgenomen bij verschillende kwekerijen. Hierdoor kan er jaarrond de beste kwaliteit geleverd worden. Mede door koeling in de schuur behouden de planten hun kwaliteit, ook in de warme zomermaanden.", "As base material Joflor uses white Phalaenopsis, sourced from several nurseries. This way the best quality can be delivered all year round. Thanks in part to cooling in the barn, the plants keep their quality even in the warm summer months."),
  ]),
  quote: lt('"Planten met toegevoegde waarde, daar doen wij het voor. Elke creatie moet verrassen."', '"Plants with added value, that is what we do it for. Every creation has to surprise."'),
  quoteBy: "John Valstar, Joflor",
  sustainEyebrow: ls("Duurzaam kweken", "Growing sustainably"),
  sustainHeading: head("italic", ls("Zorgvuldig van", "With care from"), ls("stek", "cutting"), ls("tot veiling", "to auction")),
  sustainSteps: keyed([
    { _type: "stepItem", nr: "01", title: ls("Opkweek op maat", "Tailored cultivation"), text: lt("Afhankelijk van het groeistadium staan de planten drie weken tot vier maanden bij Joflor voor de verdere opkweek.", "Depending on the growth stage, plants stay at Joflor for three weeks to four months for further cultivation.") },
    { _type: "stepItem", nr: "02", title: ls("Biologische gewasbescherming", "Biological crop protection"), text: lt("Tijdens de opkweek werken wij met biologische gewasbescherming en voldoen wij aan de duurzaamheidseisen die onze klanten stellen, zoals MPS GAP en ProductProof.", "During cultivation we work with biological crop protection and meet the sustainability requirements our customers set, such as MPS GAP and ProductProof.") },
    { _type: "stepItem", nr: "03", title: ls("Milieuvriendelijk verven", "Dyeing responsibly"), text: lt("Voor het verfproces gebruiken wij uitsluitend milieuvriendelijke verf. Zo combineren we kleur met verantwoordelijkheid.", "For the dyeing process we use environmentally friendly dye only. This is how we combine colour with responsibility.") },
  ]),
  sustainImage: img("https://images.unsplash.com/photo-1752517656908-b7285e491bc3?auto=format&fit=crop&w=1100&q=80", "Licht in een glazen kas", "De kwekerij"),
  sustainImageCaption: ls("Onder glas", "Under glass"),
  futureEyebrow: ls("Vooruit kijken", "Looking ahead"),
  futureHeading: head("dye", ls("Een vooruitstrevend bedrijf met", "A progressive company with"), ls("groeiambitie", "growth ambition"), null),
  futureText: lt("Joflor wil in de toekomst verder groeien, onder andere door het assortiment uit te breiden en in te spelen op nieuwe trends in interieur en retail. Vernieuwing zit in ons DNA: van kleurstellingen tot potcovers en etiketten.", "Joflor wants to keep growing, among other things by expanding the assortment and responding to new trends in interiors and retail. Innovation is in our DNA: from colour schemes to pot covers and labels."),
  futurePrimaryCta: cta(ls("Bekijk de collectie", "View the collection"), "/collectie", "ink"),
  futureSecondaryCta: cta(ls("Neem contact op", "Get in touch"), "/contact", "ghost"),
  futureImage: img("https://images.unsplash.com/photo-1716878271671-0076fa53fecd?auto=format&fit=crop&w=1000&q=80", "Phalaenopsis bloem van dichtbij", "Phalaenopsis"),
});

/* ---------- COLLECTIE ---------- */
docs.push({
  _id: "collectionPage",
  _type: "collectionPage",
  heroEyebrow: ls("Assortiment · Joflor collectie", "Assortment · Joflor collection"),
  heroTitleLine1: ls("Wonder en Magic,", "Wonder and Magic,"),
  heroTitle: head("dye", ls("in elke", "in every"), ls("kleur", "colour"), null),
  heroLede: lt("Joflor heeft een breed assortiment en blijft continu innoveren. Onze Phalaenopsis dragen de naam Wonder of Magic, gevolgd door de kleur. Denk aan Wonder Pink.", "Joflor offers a wide assortment and keeps innovating. Our Phalaenopsis carry the name Wonder or Magic, followed by the colour. Think of Wonder Pink."),
  modelsEyebrow: ls("Vijf modellen", "Five models"),
  modelsHeading: head("italic", ls("Van sierlijke boog tot", "From elegant arch to"), ls("volle", "abundant"), ls("cascade", "cascade")),
  namingImage: img("https://joflor.nl/img/model.jpg", "Joflor Phalaenopsis creatie", "Joflor creatie"),
  namingImageCaption: ls("Joflor creatie", "Joflor creation"),
  namingEyebrow: ls("Naamgeving", "Naming"),
  namingHeading: head("dye", ls("Elke kleur een eigen", "Every colour its own"), ls("karakter", "character"), null),
  namingText: lt("Onze Phalaenopsis dragen de naam Wonder of Magic, gevolgd door de kleur. Zo weet u in één oogopslag welke creatie u bestelt en bouwt het assortiment een herkenbaar eigen merk op in het schap.", "Our Phalaenopsis carry the name Wonder or Magic, followed by the colour. This tells you at a glance which creation you are ordering and builds a recognisable brand on the shelf."),
  namingChips: keyed([ls("Wonder Pink", "Wonder Pink"), ls("Magic Blue", "Magic Blue"), ls("Wonder Purple", "Wonder Purple"), ls("en vele andere kleuren", "and many other colours")]),
  namingNote: lt("Ook leverbaar in een keramieken pot met bijpassende kleur. Potcover en etiket zijn gemaakt van biologisch afbreekbaar materiaal.", "Also available in a ceramic pot in a matching colour. Pot cover and label are made of biodegradable material."),
  seasonsEyebrow: ls("Seizoenen en feestdagen", "Seasons and holidays"),
  seasonsHeading: head("italic", ls("Elk jaar", "Every year"), ls("nieuwe", "new"), ls("etiketten en potcovers", "labels and pot covers")),
  seasonsLede: lt("Rond de feestdagen is de Phalaenopsis extra geliefd. Daar spelen wij op in met jaarlijks nieuwe thema ontwerpen.", "Around the holidays the Phalaenopsis is extra popular. We respond with new themed designs every year."),
  seasonsCtaLabel: ls("Bekijk de dagvoorraad", "View daily stock"),
});

/* ---------- FLORAXCHANGE ---------- */
docs.push({
  _id: "floraxchangePage",
  _type: "floraxchangePage",
  heroEyebrow: ls("Assortiment · FloraXchange", "Assortment · FloraXchange"),
  heroTitleLine1: ls("Direct bestellen", "Order directly"),
  heroTitle: head("dye", ls("via", "via"), ls("FloraXchange", "FloraXchange"), null),
  heroLede: lt("Ons actuele aanbod is dagelijks te bestellen via FloraXchange, het online handelsplatform voor kwekers en handelaren. Bekijk de dagvoorraad en bestel rechtstreeks bij Joflor.", "Our current offer can be ordered daily via FloraXchange, the online trading platform for growers and traders. View the daily stock and order directly from Joflor."),
  cards: keyed([
    {
      _type: "fxCard",
      eyebrow: ls("Webshop 1", "Webshop 1"),
      title: ls("Joflor figuren", "Joflor figures"),
      text: lt("Boog, waterval, cascade en T-model. De creaties waarmee Joflor het verschil maakt.", "Arch, waterfall, cascade and T-model. The creations that set Joflor apart."),
      href: "https://floraxchange.nl/Account/Kweker/886/Joflor",
      linkLabel: ls("Open op FloraXchange", "Open on FloraXchange"),
      image: img("https://images.unsplash.com/photo-1689924114428-b14024bf6750?auto=format&fit=crop&w=1100&q=80", "Phalaenopsis figuren", "Joflor figuren"),
    },
    {
      _type: "fxCard",
      eyebrow: ls("Webshop 2", "Webshop 2"),
      title: ls("Joflor 1 en 2 tak", "Joflor 1 and 2 stems"),
      text: lt("De klassieke Phalaenopsis met één of twee takken, jaarrond leverbaar.", "The classic Phalaenopsis with one or two stems, available all year round."),
      href: "https://www.floraxchange.nl/Account/Kweker/9111/Joflor-BV",
      linkLabel: ls("Open op FloraXchange", "Open on FloraXchange"),
      image: img("https://images.unsplash.com/photo-1577378978713-9bebf3db8312?auto=format&fit=crop&w=1100&q=80", "Klassieke witte Phalaenopsis", "Joflor 1 en 2 tak"),
    },
  ]),
  contactHeading: ls("Nog geen aansluiting op FloraXchange?", "Not connected to FloraXchange yet?"),
  contactText: lt("Geen probleem. Neem contact met ons op voor de actuele voorraad, prijslijsten of specifieke wensen rond productafname. Wij denken graag met u mee.", "No problem. Contact us for current stock, price lists or specific wishes regarding product purchase. We are happy to think along with you."),
  contactCtaLabel: ls("Neem contact op", "Get in touch"),
  contactChips: keyed([ls("Dagelijks actuele voorraad", "Daily updated stock"), ls("Rechtstreeks van de kwekerij", "Straight from the nursery"), ls("Jaarrond leverbaar", "Available all year round")]),
});

/* ---------- SHOWROOM ---------- */
docs.push({
  _id: "showroomPage",
  _type: "showroomPage",
  heroEyebrow: ls("Assortiment · Showroom", "Assortment · Showroom"),
  heroTitleLine1: ls("Zien, voelen en", "See, feel and"),
  heroTitle: head("dye", null, ls("meedenken", "collaborate"), null),
  heroLede: lt("Sinds drie jaar beschikt Joflor over een eigen showroom. Handelaren komen er regelmatig samen met hun eindklanten kijken en denken mee over nieuwe producten.", "For three years Joflor has had its own showroom. Traders regularly visit together with their end customers to look around and think along about new products."),
  image: img("https://joflor.nl/img/showroom2.jpg", "De showroom van Joflor", "Showroom Joflor"),
  imageCaption: ls("Showroom · Lange Broekweg 60, Naaldwijk", "Showroom · Lange Broekweg 60, Naaldwijk"),
  introEyebrow: ls("Het volledige assortiment", "The full assortment"),
  introHeading: ls("Alles op één plek", "Everything in one place"),
  introText: lt("In onze showroom presenteren wij het hele assortiment: alle modellen, kleuren, potcovers en seizoensthema's. De ideale plek om samen met uw eindklant keuzes te maken of nieuwe ideeën te bespreken.", "In our showroom we present the entire assortment: all models, colours, pot covers and seasonal themes. The ideal place to make choices together with your end customer or to discuss new ideas."),
  cardEyebrow: ls("Bezoek op afspraak", "Visits by appointment"),
  cardHeading: ls("Plan een geschikt moment", "Plan a suitable moment"),
  cardText: lt("Wilt u langskomen of heeft u specifieke wensen rond productafname? Neem contact op met Patricia om een moment in te plannen.", "Would you like to visit or do you have specific wishes regarding product purchase? Contact Patricia to schedule a moment."),
  cardCtaLabel: ls("Plan een bezoek", "Plan a visit"),
});

/* ---------- VERZORGING ---------- */
docs.push({
  _id: "carePage",
  _type: "carePage",
  heroEyebrow: ls("Assortiment · Verzorging", "Assortment · Care"),
  heroTitleLine1: ls("Lang genieten van", "Make the most of"),
  heroTitle: head("dye", ls("uw", "your"), ls("Phalaenopsis", "Phalaenopsis"), null),
  heroLede: lt("Met de juiste plek en een vast waterritme bloeit de Phalaenopsis wekenlang. Twee eenvoudige regels maken het verschil.", "With the right spot and a steady watering rhythm, the Phalaenopsis blooms for weeks. Two simple rules make the difference."),
  cards: keyed([
    {
      _type: "careCard",
      icon: "sun",
      title: ls("Temperatuur en licht", "Temperature and light"),
      paragraphs: keyed([
        lt("De Phalaenopsis groeit goed bij normale kamertemperaturen, bij voorkeur tussen 18°C en 22°C. Zet de plant op een lichte plek, maar vermijd direct zonlicht in de zomermaanden (april t/m augustus). Hierdoor kunnen de bladeren geel kleuren.", "The Phalaenopsis grows well at normal room temperatures, preferably between 18°C and 22°C. Place the plant in a light spot, but avoid direct sunlight in the summer months (April to August), as this can turn the leaves yellow."),
        lt("Het uitvallen van bloemknoppen of bladeren kan juist wijzen op een gebrek aan licht.", "Dropping flower buds or leaves can in turn indicate a lack of light."),
      ]),
    },
    {
      _type: "careCard",
      icon: "drop",
      title: ls("Water en voeding", "Water and feeding"),
      paragraphs: keyed([
        lt("Geef de Phalaenopsis 1x per week water (mini's 2x per week). Dompel de kweekpot gedurende 10 minuten onder in een laagje water, zodat de wortels voldoende tijd hebben om het water op te nemen. Zet de plant daarna terug in de sierpot.", "Water the Phalaenopsis once a week (minis twice a week). Submerge the grow pot in a layer of water for 10 minutes, so the roots have enough time to absorb it. Then place the plant back in the decorative pot."),
        lt("Let op dat er geen water in de sierpot blijft staan; de orchidee houdt niet van natte voeten. Voor optimaal bloeiplezier geeft u 1x per maand voeding van Pokon of Culvita.", "Make sure no water remains in the decorative pot; the orchid does not like wet feet. For optimal flowering, feed once a month with Pokon or Culvita."),
      ]),
    },
  ]),
  summaryImage: img("https://images.unsplash.com/photo-1769812343377-73d69a978ec4?auto=format&fit=crop&w=1000&q=80", "Witte Phalaenopsis tussen groen blad", "Phalaenopsis verzorging"),
  summaryImageCaption: ls("Wekenlang bloei", "Weeks of bloom"),
  summaryEyebrow: ls("In het kort", "In short"),
  summaryHeading: ls("De vuistregels", "The rules of thumb"),
  summaryChips: keyed([ls("18 tot 22 °C", "18 to 22 °C"), ls("Licht, geen directe zon", "Light, no direct sun"), ls("1x per week dompelen", "Submerge once a week"), ls("Mini's 2x per week", "Minis twice a week"), ls("Geen natte voeten", "No wet feet"), ls("1x per maand voeding", "Feed once a month")]),
  summaryNote: lt("Vragen over verzorging of presentatie op de winkelvloer? Wij adviseren onze afnemers graag.", "Questions about care or presentation on the shop floor? We are happy to advise our customers."),
  summaryCtaLabel: ls("Neem contact op", "Get in touch"),
});

/* ---------- CERTIFICATEN ---------- */
docs.push({
  _id: "certificatesPage",
  _type: "certificatesPage",
  heroEyebrow: ls("Certificaten", "Certificates"),
  heroTitleLine1: ls("Aantoonbaar", "Demonstrably"),
  heroTitle: head("dye", null, ls("duurzaam", "sustainable"), null),
  heroLede: lt("Met onze MPS certificeringen verzekeren wij u dat wij rekening houden met milieu, mens en maatschappij. De kwaliteit en betrouwbaarheid van onze Phalaenopsis en ons bedrijf worden regelmatig getoetst.", "Our MPS certifications assure you that we take the environment, people and society into account. The quality and reliability of our Phalaenopsis and our company are tested regularly."),
  meaningEyebrow: ls("Wat dit voor u betekent", "What this means for you"),
  meaningHeading: head("dye", ls("Zekerheid in elke", "Certainty in every"), ls("schakel", "link"), null),
  meaningParagraphs: keyed([
    lt("Met het MPS label voldoen wij aan de eisen die onze afnemers stellen. Doet u zaken met Joflor, dan weet u zeker dat de milieu, kwaliteits en sociale aspecten zijn geborgd.", "With the MPS label we meet the requirements our customers set. When you do business with Joflor, you can be certain that environmental, quality and social aspects are assured."),
    lt("Tijdens de opkweek werken wij bovendien met biologische gewasbescherming en gebruiken wij uitsluitend milieuvriendelijke verf.", "During cultivation we also work with biological crop protection and use environmentally friendly dye only."),
  ]),
  meaningLogoUrl: "https://joflor.nl/img/mps.png",
});

/* ---------- CONTACT ---------- */
docs.push({
  _id: "contactPage",
  _type: "contactPage",
  heroEyebrow: ls("Contact", "Contact"),
  heroTitleLine1: ls("Wij denken graag", "Let's discuss what"),
  heroTitle: head("dye", ls("met u", "works for"), ls("mee", "you"), null),
  heroLede: lt("Vragen over het assortiment, de dagvoorraad of een showroombezoek? Bel of mail ons gerust.", "Questions about the assortment, daily stock or a showroom visit? Feel free to call or email us."),
  locationEyebrow: ls("Bezoekadres", "Visiting address"),
  locationNote: ls("Showroom geopend op afspraak.", "Showroom open by appointment."),
  locationCtaLabel: ls("Route plannen", "Plan your route"),
  locationImage: img("https://images.unsplash.com/photo-1775405298533-3e5909b16c43?auto=format&fit=crop&w=1100&q=80", "Phalaenopsis in zacht licht", "Naaldwijk · Westland"),
});

/* commit */
const tx = client.transaction();
docs.forEach((d) => tx.createOrReplace(d));
const res = await tx.commit();
console.log(`Seeded ${docs.length} documenten. Transactie: ${res.transactionId}`);
