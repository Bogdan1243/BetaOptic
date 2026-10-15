import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Monitor,
  Layers,
  BookOpen,
  Sun,
  Compass,
  Laptop,
  Car,
  Activity,
  Briefcase,
  Feather,
  Sparkles,
  Glasses,
  Award,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  HelpCircle
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 'need',
    stepNumber: 1,
    category: 'Nevoie Vizuală',
    question: 'Care este principala ta necesitate vizuală?',
    subtitle: 'Selectează obiectivul prioritar pentru noua ta pereche de ochelari.',
    options: [
      {
        id: 'vedere',
        title: 'Vedere zilnică & distanță',
        subtitle: 'Miopie, hipermetropie sau astigmatism',
        desc: 'Claritate impecabilă și contrast optim pentru întreaga zi.',
        icon: Eye
      },
      {
        id: 'ecrane',
        title: 'Protecție Ecrane & Birou',
        subtitle: 'Lumină albastră & oboseală digitală',
        desc: 'Relaxare musculară oculară pentru lucrul intensiv la monitor.',
        icon: Monitor
      },
      {
        id: 'progresiv',
        title: 'Progresivi multifocali',
        subtitle: 'Aproape, intermediar și distanță',
        desc: 'Tranziție continuă fără distorsiuni, într-o singură lentilă elegantă.',
        icon: Layers
      },
      {
        id: 'citit',
        title: 'Citit & Lucru de aproape',
        subtitle: 'Cărți, documente și telefon mobil',
        desc: 'Confort de proximitate fără senzație de tensiune oculară.',
        icon: BookOpen
      },
      {
        id: 'soare',
        title: 'Ochelari de soare cu dioptrii',
        subtitle: 'Protecție UV & polarizare de top',
        desc: 'Filtru solar 100% UV, eliminarea reflexiilor orbitoare și stil.',
        icon: Sun
      },
      {
        id: 'evaluare',
        title: 'Evaluare nouă / Nu sunt sigur',
        subtitle: 'Consult de la zero cu optometrist',
        desc: 'Vom analiza acuitatea vizuală direct în atelierul Beta Optic.',
        icon: Compass
      }
    ]
  },
  {
    id: 'lifestyle',
    stepNumber: 2,
    category: 'Stil de Viață',
    question: 'Cum arată o zi obișnuită din stilul tău de viață?',
    subtitle: 'Lentilele trebuie să se sincronizeze cu ritmul și mediul tău cotidian.',
    options: [
      {
        id: 'birou',
        title: 'Birou & Monitoare 8+ ore/zi',
        subtitle: 'Mediu office, ecrane multiple',
        desc: 'Ai nevoie de tratamente cu spectru selectiv și protecție digitală.',
        icon: Laptop
      },
      {
        id: 'sofat',
        title: 'Condus frecvent (zi & noapte)',
        subtitle: 'Trafic urban și drumuri lungi',
        desc: 'Focalizare pe eliminarea reflexiilor orbitoare cauzate de farurile LED.',
        icon: Car
      },
      {
        id: 'sport',
        title: 'Activități în aer liber & sport',
        subtitle: 'Dinamism, mișcare și călătorii',
        desc: 'Rame ultra-stabile, greutate minimă și rezistență mecanică.',
        icon: Activity
      },
      {
        id: 'mixt',
        title: 'Activitate dinamică mixtă',
        subtitle: 'Ședințe, deplasări și birou',
        desc: 'Soluție universală versatilă adaptată variațiilor de lumină.',
        icon: Briefcase
      }
    ]
  },
  {
    id: 'frameStyle',
    stepNumber: 3,
    category: 'Material & Estetică',
    question: 'Ce stil sau material de ramă te atrage cel mai mult?',
    subtitle: 'Rama este extensia identității tale și garantul confortului de purtare.',
    options: [
      {
        id: 'titan',
        title: 'Titan Japonez Ultra-Ușor',
        subtitle: 'Sub 10g, hipoalergenic & durabil',
        desc: 'Flexibilitate desăvârșită, linii pure și rezistență de o viață.',
        icon: Feather
      },
      {
        id: 'acetat',
        title: 'Acetat Clasic Măcinat Manual',
        subtitle: 'Texturi profunde & profil sculptat',
        desc: 'Personalitate atemporală, lustruit manual de meșteri artizani.',
        icon: Sparkles
      },
      {
        id: 'rimless',
        title: 'Fără Ramă (Rimless) / Discret',
        subtitle: 'Lentile flotante, senzație aeriană',
        desc: 'Eleganță minimalistă imperceptibilă, montaj laser de precizie.',
        icon: Glasses
      },
      {
        id: 'nobil',
        title: 'Materiale Nobiliare & Bespoke',
        subtitle: 'Corn natural, aur & lemn nobil',
        desc: 'Piese rare în ediții limitate cu finisaje aristocratice unice.',
        icon: Award
      }
    ]
  },
  {
    id: 'hasPrescription',
    stepNumber: 4,
    category: 'Prescripție Medicală',
    question: 'Ai o rețetă actualizată de la medicul tău?',
    subtitle: 'Ne asigurăm că parametrii dioptrici sunt actuali și riguros măsurați.',
    options: [
      {
        id: 'da',
        title: 'Da, am o rețetă actualizată',
        subtitle: 'Efectuată în ultimele 12 luni',
        desc: 'Ne vom concentra pe centrarea video 3D și montajul în atelier.',
        icon: CheckCircle2
      },
      {
        id: 'nu',
        title: 'Nu / Doresc consult în atelier',
        subtitle: 'Evaluare optometrică completă',
        desc: 'Vei beneficia de examinare computerizată în cabinetul Beta Optic.',
        icon: Calendar
      }
    ]
  }
];

function getRecommendation(answers) {
  // 1. Lentile
  let lens = {
    title: 'Lentile Monofocale Asferice Ultra-Subțiri',
    partner: 'Nikon & Zeiss Optics',
    desc: 'Lentile cu indice ridicat de refracție, ultra-subțiri și asferice, concepute să păstreze aspectul natural al ochilor și o claritate impecabilă la margini.',
    highlight: 'Claritate cristal & estetică invizibilă'
  };

  if (answers.need === 'progresiv') {
    lens = {
      title: 'Lentile Progresive Freeform Individualizate',
      partner: 'Nikon Presio Master & Essilor Varilux',
      desc: 'Calculate pe baza mișcărilor tale naturale de privire. Asigură o trecere fluidă între distanță, birou și citit, fără senzație de distorsiune periferică.',
      highlight: 'Adaptare imediată & zero compromis de claritate'
    };
  } else if (answers.need === 'ecrane' || answers.lifestyle === 'birou') {
    lens = {
      title: 'Lentile cu Filtru Selectiv BlueControl & Relax Digital',
      partner: 'Zeiss BlueGuard & Hoya BlueControl',
      desc: 'Filtrează selectiv lumina albastră-violet dăunătoare și relaxează mușchiul ciliar în timpul orelor prelungite petrecute în fața monitoarelor.',
      highlight: 'Relaxare vizuală & protecție retiniană superioară'
    };
  } else if (answers.lifestyle === 'sofat') {
    lens = {
      title: 'Lentile Specializate pentru Condus DriveSafe',
      partner: 'Zeiss DriveSafe & Hoya EnRoute',
      desc: 'Tratament antireflex optimizat pentru reducerea reflexiilor orbitoare nocturne cauzate de farurile LED și contrast sporit pe carosabil umed.',
      highlight: 'Siguranță la volan & contrast nocturn superior'
    };
  } else if (answers.need === 'citit') {
    lens = {
      title: 'Lentile Degresive de Proximitate (Office & Reading)',
      partner: 'Essilor & Nikon Relax',
      desc: 'Câmp vizual extins pentru documente și ecran, mult mai comod și natural decât ochelarii convenționali de citit.',
      highlight: 'Câmp vizual extins & postură naturală'
    };
  } else if (answers.need === 'soare' || answers.lifestyle === 'sport') {
    lens = {
      title: 'Lentile Solare cu Dioptrie & Polarizare Japoneză',
      partner: 'Nikon Sun & Hoya Polarized',
      desc: 'Filtrare 100% a radiațiilor UVA/UVB, eliminarea strălucirilor orbitoare și tratament antireflex pe suprafața interioară a lentilei.',
      highlight: 'Contrast vibrant & protecție UV absolută'
    };
  }

  // 2. Rame
  let frame = {
    title: 'Rame din Titan Pur Japonez',
    brand: 'Matsuda / Silhouette / Lindberg',
    desc: 'Construcție de o lejeritate uluitoare (sub 8 grame), flexibilitate mecanică și compatibilitate hipoalergenică fără puncte de presiune.',
    highlight: 'Greutate insesizabilă & durabilitate de o viață'
  };

  if (answers.frameStyle === 'acetat') {
    frame = {
      title: 'Rame din Acetat Măcinat Manual & Celuloid',
      brand: 'Brunello Cucinelli / Oliver Peoples',
      desc: 'Acetat dens lustruit manual în etape succesive, ce oferă o adâncime de culoare caldă și o prezență sculpturală distinsă.',
      highlight: 'Eleganță atemporală & caracter asumat'
    };
  } else if (answers.frameStyle === 'rimless') {
    frame = {
      title: 'Montaj Minimalist Fără Ramă (Rimless)',
      brand: 'Atelier Beta Optic Bespoke',
      desc: 'Găurire și frezare laser în atelierul propriu, oferind o senzație completă de lentile flotante și discreție absolută pe fizionomie.',
      highlight: 'Eleganță aeriană & minimalism pur'
    };
  } else if (answers.frameStyle === 'nobil') {
    frame = {
      title: 'Rame din Materiale Nobiliare & Artizanale',
      brand: 'Colecții Rare din Corn Natural & Aur',
      desc: 'Piese sculptate manual din corn de bivol indian sau finisate cu metale prețioase, reglate personalizat pe fizionomia ta.',
      highlight: 'Unicitate organică & lux aristocratic'
    };
  }

  // 3. Protocol consult
  let consult = {
    title: 'Centrare Video 3D & Verificare Prescripție',
    desc: 'Verificăm dioptriile existente și măsurăm milimetric pe rama aleasă: distanța interpupilară, înălțimea de montaj și unghiul pantoscopic.',
    action: 'Te așteptăm cu rețeta ta actualizată'
  };

  if (answers.hasPrescription === 'nu') {
    consult = {
      title: 'Consult Optometric Complet & Testare Binoculară',
      desc: 'Optometriștii noștri vor realiza examinarea computerizată a refracției, acuității vizuale și echilibrului ocular direct în atelier.',
      action: 'Programare inclusă pentru consult complet'
    };
  }

  return { lens, frame, consult };
}

export default function QAFormSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({
    need: '',
    lifestyle: '',
    frameStyle: '',
    hasPrescription: ''
  });

  // Optional quick callback request state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const cardRef = useRef(null);

  const totalQuestions = QUESTIONS.length;
  const isCompleted = currentStep >= totalQuestions;
  const currentQuestion = QUESTIONS[currentStep];

  const handleSelectOption = (optionId) => {
    const questionId = currentQuestion.id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));

    // Smooth advance to next step after brief tactile feedback
    setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }, 280);
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) return;
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalQuestions));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setDirection(-1);
    setAnswers({
      need: '',
      lifestyle: '',
      frameStyle: '',
      hasPrescription: ''
    });
    setContactSubmitted(false);
    setContactName('');
    setContactPhone('');
    setCurrentStep(0);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactPhone.trim()) return;
    setContactSubmitted(true);
  };

  const getOptionLabel = (qId, valId) => {
    const q = QUESTIONS.find((item) => item.id === qId);
    if (!q) return valId;
    const opt = q.options.find((item) => item.id === valId);
    return opt ? opt.title : valId;
  };

  const recommendation = isCompleted ? getRecommendation(answers) : null;

  const getWhatsAppHref = () => {
    const text =
      `Bună ziua! Am realizat analiza nevoilor vizuale pe site-ul Beta Optic:\n` +
      `• Necesitate: ${getOptionLabel('need', answers.need)}\n` +
      `• Stil de viață: ${getOptionLabel('lifestyle', answers.lifestyle)}\n` +
      `• Stil rame: ${getOptionLabel('frameStyle', answers.frameStyle)}\n` +
      `• Prescripție: ${getOptionLabel('hasPrescription', answers.hasPrescription)}\n\n` +
      `Aș dori să aflu mai multe detalii și să stabilim o vizită în atelierul Beta Optic.`;
    return `https://wa.me/40722800900?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="consultare" className="py-24 sm:py-28 px-4 sm:px-8 md:px-16 w-full bg-[#FAF8F5] text-[#0F172A] border-t border-[#0F172A]/10 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Consultare Prealabilă & Recomandare Bespoke</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="serif-title text-4xl sm:text-6xl font-semibold text-[#0F172A] leading-tight mb-4"
          >
            Analiză Prealabilă a Nevoilor Tale Vizuale
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#0F172A]/75 text-base md:text-lg font-normal max-w-xl mx-auto"
          >
            Răspunde la câteva întrebări simple pentru a contura soluția optică ideală, urmată de recomandarea personalizată a specialiștilor noștri.
          </motion.p>
        </div>

        {/* Card Container */}
        <div
          ref={cardRef}
          className="rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] shadow-sm relative overflow-hidden transition-all duration-300"
        >
          {/* Top Progress Bar & Header (visible during question steps) */}
          {!isCompleted && (
            <div className="border-b border-[#0F172A]/10 px-6 sm:px-10 py-5 bg-[#FAF8F5]/60 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-[#0F172A]/70 mb-3">
                <span className="flex items-center gap-2 text-[#C5A059] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentQuestion.category}</span>
                </span>
                <span>
                  Întrebarea <strong className="text-[#0F172A]">{currentStep + 1}</strong> din {totalQuestions}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 bg-[#0F172A]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#0F172A]"
                  initial={false}
                  animate={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              </div>

              {/* Step Dots */}
              <div className="flex justify-between items-center mt-3 pt-1">
                {QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      // Allow jumping back to already seen or previous questions
                      if (idx <= currentStep || answers[QUESTIONS[idx - 1]?.id]) {
                        setDirection(idx > currentStep ? 1 : -1);
                        setCurrentStep(idx);
                      }
                    }}
                    className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                      idx === currentStep
                        ? 'text-[#0F172A] font-bold'
                        : idx < currentStep
                        ? 'text-[#0F172A]/60 hover:text-[#0F172A] cursor-pointer'
                        : 'text-[#0F172A]/30 cursor-default'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all ${
                        idx === currentStep
                          ? 'bg-[#0F172A] text-[#FAF8F5]'
                          : idx < currentStep
                          ? 'bg-[#0F172A]/15 text-[#0F172A]'
                          : 'bg-[#0F172A]/5 text-[#0F172A]/40'
                      }`}
                    >
                      {idx < currentStep ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </span>
                    <span className="hidden sm:inline">{q.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Card Body */}
          <div className="p-6 sm:p-10 md:p-12">
            <AnimatePresence mode="wait">
              {!isCompleted ? (
                /* Question View */
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 24 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  {/* Question Title & Subtitle */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                      Pasul {currentStep + 1} din {totalQuestions}
                    </span>
                    <h3 className="serif-title text-2xl sm:text-4xl font-semibold text-[#0F172A] leading-tight">
                      {currentQuestion.question}
                    </h3>
                    <p className="text-sm sm:text-base text-[#0F172A]/70">
                      {currentQuestion.subtitle}
                    </p>
                  </div>

                  {/* Answers Grid */}
                  <div
                    className={`grid gap-3.5 ${
                      currentQuestion.options.length <= 2
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : currentQuestion.options.length === 4
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {currentQuestion.options.map((option) => {
                      const IconComp = option.icon;
                      const isSelected = answers[currentQuestion.id] === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectOption(option.id)}
                          className={`group text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative cursor-pointer ${
                            isSelected
                              ? 'bg-[#0F172A] text-[#FAF8F5] border-[#0F172A] shadow-md ring-2 ring-[#0F172A]/20 scale-[1.01]'
                              : 'bg-[#FAF8F5] text-[#0F172A] border-[#0F172A]/15 hover:border-[#0F172A]/40 hover:bg-white shadow-xs'
                          }`}
                        >
                          <div>
                            {/* Option Top: Icon + Checkmark */}
                            <div className="flex items-center justify-between mb-3">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-[#FAF8F5]/15 text-[#C5A059]'
                                    : 'bg-[#0F172A]/5 text-[#0F172A] group-hover:bg-[#C5A059]/15 group-hover:text-[#0F172A]'
                                }`}
                              >
                                <IconComp className="w-5 h-5 stroke-[1.8]" />
                              </div>

                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-[#C5A059] text-[#0F172A]'
                                    : 'border border-[#0F172A]/20 opacity-40 group-hover:opacity-80'
                                }`}
                              >
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full" />
                                )}
                              </div>
                            </div>

                            {/* Option Title */}
                            <h4
                              className={`text-base font-semibold leading-snug mb-1 ${
                                isSelected ? 'text-[#FAF8F5]' : 'text-[#0F172A]'
                              }`}
                            >
                              {option.title}
                            </h4>

                            {/* Option Subtitle */}
                            <p
                              className={`text-xs font-medium mb-2 ${
                                isSelected ? 'text-[#C5A059]' : 'text-[#0F172A]/60'
                              }`}
                            >
                              {option.subtitle}
                            </p>

                            {/* Option Description */}
                            <p
                              className={`text-xs leading-relaxed ${
                                isSelected ? 'text-[#FAF8F5]/75' : 'text-[#0F172A]/65'
                              }`}
                            >
                              {option.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Card Navigation Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#0F172A]/10">
                    <div>
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F172A]/20 text-[#0F172A] text-xs font-semibold uppercase tracking-wider hover:bg-[#0F172A]/5 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Înapoi</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#0F172A]/60 hidden sm:inline">
                        {answers[currentQuestion.id]
                          ? 'Răspuns salvat'
                          : 'Alege o variantă pentru a continua'}
                      </span>
                      <button
                        type="button"
                        disabled={!answers[currentQuestion.id]}
                        onClick={handleNext}
                        className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs ${
                          answers[currentQuestion.id]
                            ? 'bg-[#0F172A] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0F172A] cursor-pointer'
                            : 'bg-[#0F172A]/20 text-[#FAF8F5]/60 cursor-not-allowed'
                        }`}
                      >
                        <span>{currentStep === totalQuestions - 1 ? 'Vezi Rezultatul' : 'Continuă'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Results View (Met with answers info and Te așteptăm la Beta Optic) */
                <motion.div
                  key="results-step"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-10"
                >
                  {/* Top Welcome Banner */}
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#0F172A] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
                      <Sparkles className="w-8 h-8 stroke-[1.8]" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#0F172A] text-xs uppercase tracking-widest font-semibold">
                      <span>Analiză Finalizată</span>
                    </div>

                    {/* The prominent user-requested message */}
                    <h3 className="serif-title text-3xl sm:text-5xl font-bold text-[#0F172A] leading-tight max-w-2xl mx-auto">
                      Te așteptăm la Beta Optic pentru a discuta mai multe
                    </h3>

                    <p className="text-[#0F172A]/80 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                      Am sintetizat profilul tău vizual pe baza răspunsurilor oferite. Fiecare privire este unică, motiv pentru care te invităm în atelierul nostru de pe Strada Lucian Blaga să probăm ramele adaptate fizionomiei tale și să calibrăm lentilele ideale.
                    </p>
                  </div>

                  {/* Summary of User Answers */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#0F172A]/10">
                    <div className="flex items-center justify-between mb-4">
                      <strong className="text-xs uppercase tracking-widest text-[#0F172A]">
                        Profilul Tău Selectat
                      </strong>
                      <button
                        type="button"
                        onClick={handleRestart}
                        className="inline-flex items-center gap-1.5 text-xs text-[#0F172A]/70 hover:text-[#0F172A] font-semibold underline underline-offset-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Modifică răspunsurile</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/5">
                        <span className="block text-[#0F172A]/50 uppercase tracking-wider text-[10px] mb-1">
                          1. Necesitate
                        </span>
                        <strong className="text-[#0F172A] text-sm font-semibold">
                          {getOptionLabel('need', answers.need)}
                        </strong>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/5">
                        <span className="block text-[#0F172A]/50 uppercase tracking-wider text-[10px] mb-1">
                          2. Stil de viață
                        </span>
                        <strong className="text-[#0F172A] text-sm font-semibold">
                          {getOptionLabel('lifestyle', answers.lifestyle)}
                        </strong>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/5">
                        <span className="block text-[#0F172A]/50 uppercase tracking-wider text-[10px] mb-1">
                          3. Stil rame
                        </span>
                        <strong className="text-[#0F172A] text-sm font-semibold">
                          {getOptionLabel('frameStyle', answers.frameStyle)}
                        </strong>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/5">
                        <span className="block text-[#0F172A]/50 uppercase tracking-wider text-[10px] mb-1">
                          4. Rețetă
                        </span>
                        <strong className="text-[#0F172A] text-sm font-semibold">
                          {getOptionLabel('hasPrescription', answers.hasPrescription)}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Personalized Insight / Information Regarding Your Answers */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <h4 className="text-xs uppercase tracking-widest font-bold text-[#0F172A]">
                        Recomandările Specialiștilor Beta Optic pentru Tine
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* 1. Lentile */}
                      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0F172A]/10 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                            Soluția Optică Recomandată
                          </span>
                          <h5 className="text-base font-bold text-[#0F172A] leading-snug">
                            {recommendation.lens.title}
                          </h5>
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0F172A]/10 text-[#0F172A]">
                            {recommendation.lens.partner}
                          </span>
                          <p className="text-xs text-[#0F172A]/75 leading-relaxed pt-2">
                            {recommendation.lens.desc}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[#0F172A]/10 text-[11px] font-semibold text-[#0F172A]">
                          ✓ {recommendation.lens.highlight}
                        </div>
                      </div>

                      {/* 2. Rame & Montaj */}
                      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0F172A]/10 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                            Ergonomie & Tip Ramă
                          </span>
                          <h5 className="text-base font-bold text-[#0F172A] leading-snug">
                            {recommendation.frame.title}
                          </h5>
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0F172A]/10 text-[#0F172A]">
                            {recommendation.frame.brand}
                          </span>
                          <p className="text-xs text-[#0F172A]/75 leading-relaxed pt-2">
                            {recommendation.frame.desc}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[#0F172A]/10 text-[11px] font-semibold text-[#0F172A]">
                          ✓ {recommendation.frame.highlight}
                        </div>
                      </div>

                      {/* 3. Protocol Vizită */}
                      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0F172A]/10 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                            Protocolul Vizitei Tale
                          </span>
                          <h5 className="text-base font-bold text-[#0F172A] leading-snug">
                            {recommendation.consult.title}
                          </h5>
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#0F172A]">
                            {recommendation.consult.action}
                          </span>
                          <p className="text-xs text-[#0F172A]/75 leading-relaxed pt-2">
                            {recommendation.consult.desc}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[#0F172A]/10 text-[11px] font-semibold text-[#0F172A]">
                          ✓ Centrare computerizată 3D în atelier
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] text-[#FAF8F5] space-y-6">
                    <div className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="serif-title text-2xl font-bold text-[#FAF8F5]">
                          Hai să facem primul pas
                        </h4>
                        <p className="text-xs sm:text-sm text-[#FAF8F5]/70 max-w-md">
                          Contactează-ne direct sau programează o vizită. Te așteptăm în showroom-ul nostru cu cafea proaspătă și expertiză dedicată.
                        </p>
                      </div>

                      {/* Phone & WhatsApp Quick Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                          href="tel:+40722800900"
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C5A059] text-[#0F172A] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F5] transition-all shadow-md"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Sună la Atelier</span>
                        </a>

                        <a
                          href={getWhatsAppHref()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FAF8F5]/10 text-[#FAF8F5] border border-[#FAF8F5]/20 text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF8F5] hover:text-[#0F172A] transition-all"
                        >
                          <MessageCircle className="w-4 h-4 text-[#C5A059]" />
                          <span>Trimite pe WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Optional Call Request Form */}
                    <div className="pt-6 border-t border-[#FAF8F5]/15">
                      {contactSubmitted ? (
                        <div className="flex items-center gap-3 text-xs text-[#FAF8F5] bg-[#FAF8F5]/10 p-4 rounded-xl border border-[#FAF8F5]/20">
                          <CheckCircle2 className="w-5 h-5 text-[#C5A059] flex-none" />
                          <span>
                            Mulțumim{contactName ? `, ${contactName}` : ''}! Am primit solicitarea ta. Te vom contacta în scurt timp la numărul <strong>{contactPhone}</strong> pentru a discuta detaliile recomandării.
                          </span>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-3">
                          <label className="block text-xs font-medium text-[#FAF8F5]/80">
                            Preferi să te sunăm noi? Lasă-ne numărul de telefon:
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="text"
                              placeholder="Numele tău (opțional)"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="px-4 py-2.5 rounded-xl bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 text-[#FAF8F5] placeholder-[#FAF8F5]/40 text-xs focus:outline-none focus:border-[#C5A059] transition-colors flex-1"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Număr de telefon *"
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              className="px-4 py-2.5 rounded-xl bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 text-[#FAF8F5] placeholder-[#FAF8F5]/40 text-xs focus:outline-none focus:border-[#C5A059] transition-colors flex-1"
                            />
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FAF8F5] text-[#0F172A] text-xs font-bold uppercase tracking-wider hover:bg-[#C5A059] transition-colors flex-none"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Trimite Solicitarea</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Bottom Reset Action */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#0F172A]/20 text-[#0F172A] text-xs font-semibold uppercase tracking-wider hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reia Chestionarul de la Început</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
