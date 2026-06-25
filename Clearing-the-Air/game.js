/* =============================================
   CLEARING THE AIR — game logic
   Level 0 prototype — vanilla JS, no backend
   ============================================= */

'use strict';

// --------------- QUESTION DATA ---------------
// Inlined so the game works from file:// with no server needed.
// Single-quoted JS strings avoid all JSON escape issues.

const QUESTION_POOLS = {
  body: [
    {
      statement: 'Nicotine is the main substance in cigarette smoke that causes cancer.',
      classification: 'Myth',
      explanation: 'Carcinogens come mainly from the thousands of chemicals produced by burning tobacco (tar and other combustion byproducts), not nicotine itself. Nicotine is addictive but is not classified as a carcinogen.',
      citation: 'Royal College of Physicians, "Nicotine without Smoke" (2016); PHE (2015)'
    },
    {
      statement: 'Carbon monoxide from cigarette smoke reduces the amount of oxygen your blood can carry.',
      classification: 'Fact',
      explanation: "CO binds to haemoglobin more readily than oxygen, reducing the blood's oxygen-carrying capacity.",
      citation: 'WHO Tobacco Fact Sheet'
    },
    {
      statement: 'Quitting smoking after years of damage is pointless because the harm is already done.',
      classification: 'Myth',
      explanation: 'Lung function and cardiovascular risk begin improving within days to weeks of stopping, and risk keeps declining the longer someone stays smoke-free.',
      citation: 'US Surgeon General Report (1990, updated 2020)'
    },
    {
      statement: 'Around 95% of the harm from smoking comes from the burning process, not the nicotine.',
      classification: 'Fact',
      explanation: 'Widely cited estimate from UK public health research; framing and exact figure should be confirmed by committee for local use.',
      citation: 'Public Health England (2015), McNeill et al.; Nicotine 2030 (Yach, 2026) — confirm wording with committee'
    },
    {
      statement: 'Tar build-up in the lungs is one of the main causes of smoking-related lung disease.',
      classification: 'Fact',
      explanation: 'Tar is a combustion byproduct that accumulates in lung tissue and airways.',
      citation: 'WHO / American Lung Association'
    },
    {
      statement: 'Nicotine on its own causes lung cancer.',
      classification: 'Myth',
      explanation: 'Nicotine is addictive and affects the cardiovascular system, but the major cancer-causing damage comes from combustion byproducts, not nicotine.',
      citation: 'Royal College of Physicians (2016)'
    },
    {
      statement: 'Nearly 4 in 5 doctors worldwide are estimated to still believe nicotine itself causes cancer.',
      classification: 'Fact (about misperception)',
      explanation: 'A striking finding worth using directly: if this misperception is common among physicians, it is unsurprising the public shares it — this is a core reason the game exists.',
      citation: 'Nicotine 2030 (Yach, 2026) — figure to be independently verified by committee before use'
    },
    {
      statement: 'Once lungs are damaged by smoking, they can never recover any function.',
      classification: 'Myth',
      explanation: 'Some damage is permanent, but cilia function and some lung capacity can partially recover after quitting.',
      citation: 'American Lung Association — confirm with committee'
    },
    {
      statement: '"Light" or "low-tar" cigarettes are significantly safer than regular cigarettes.',
      classification: 'Myth',
      explanation: 'In real-world smoking patterns, "light" cigarettes deliver similar levels of harmful chemicals; the label is misleading.',
      citation: 'WHO Framework Convention on Tobacco Control'
    },
    {
      statement: 'Secondhand smoke only affects people who already have asthma or lung conditions.',
      classification: 'Myth',
      explanation: 'Secondhand smoke contains the same combustion byproducts and poses risks to anyone exposed, especially children.',
      citation: 'WHO Tobacco Fact Sheet'
    },
    {
      statement: 'The lungs are the only organ affected by cigarette combustion byproducts.',
      classification: 'Myth',
      explanation: 'Combustion byproducts also affect the heart, blood vessels, and other organ systems.',
      citation: 'US Surgeon General Report — confirm with committee'
    },
    {
      statement: 'About 7 in every 8 lung cancer cases are caused by tobacco smoking.',
      classification: 'Fact',
      explanation: 'One of the clearest, most teachable statistics linking smoking directly to lung cancer risk.',
      citation: 'Drug Science UK, "Nicotine" (drugscience.org.uk/nicotine)'
    },
    {
      statement: 'About 3 in every 4 oral cancer cases are caused by tobacco use.',
      classification: 'Fact',
      explanation: 'Smoking is also a leading driver of cancers of the mouth and throat, not just the lungs.',
      citation: 'Drug Science UK, "Nicotine"'
    },
    {
      statement: 'Smoking makes most people feel calmer overall, day to day, compared with non-smokers.',
      classification: 'Myth',
      explanation: 'Smokers are typically more stressed across the day than non-smokers, because nicotine withdrawal between cigarettes drives rising irritability; a cigarette only relieves the stress nicotine dependence itself created.',
      citation: 'Drug Science UK, "Nicotine" — myths and misunderstandings section'
    },
    {
      statement: 'Smoking damages the tiny hairs (cilia) that sweep mucus out of the lungs.',
      classification: 'Fact',
      explanation: "This is why long-term smokers often develop a persistent cough — mucus and tar build up because the lungs' self-clearing mechanism is impaired.",
      citation: 'Drug Science UK, "Nicotine"'
    },
    {
      statement: 'Smoking has no effect on bone strength.',
      classification: 'Myth',
      explanation: 'Smoking interferes with bone mineralisation, leaving bones (especially hips and the spine) weaker and more likely to fracture, particularly in later life.',
      citation: 'Journal of Adolescent Health; Drug Science UK, "Nicotine" — confirm exact figures with committee'
    },
    {
      statement: 'Combustion of tobacco produces thousands of chemicals, including dozens of known carcinogens — nicotine is not one of them.',
      classification: 'Fact',
      explanation: 'Burning tobacco leaf creates the bulk of harmful exposure; this is the central "combustion is the enemy, not nicotine" framing used throughout this game.',
      citation: 'Nicotine 2030 (Yach, 2026); Royal College of Physicians (2016)'
    },
    {
      statement: 'Nicotine withdrawal, while unpleasant, is not itself physically dangerous.',
      classification: 'Fact',
      explanation: 'Cravings, irritability and restlessness are real but are not medically dangerous in the way withdrawal from some other substances can be.',
      citation: 'Drug Science UK, "Nicotine"'
    },
    {
      statement: 'Smoking is associated with a higher risk of cardiovascular disease, including heart attack and stroke.',
      classification: 'Fact',
      explanation: 'Combustion byproducts damage blood vessels and raise blood pressure, increasing cardiovascular risk substantially.',
      citation: 'Drug Science UK, "Nicotine"; WHO Tobacco Fact Sheet'
    },
    {
      statement: 'Half of all long-term smokers who never quit will eventually die of a smoking-related disease.',
      classification: 'Fact',
      explanation: 'One of the most-cited statistics in tobacco control, underscoring why reducing combustion exposure matters so much.',
      citation: 'Drug Science UK, "Nicotine"; UK tobacco control literature — confirm exact wording with committee'
    }
  ],

  village: [
    {
      statement: 'If you smoke outside the house, your family is not affected by your smoking.',
      classification: 'Myth',
      explanation: 'Residue ("thirdhand smoke") settles on clothes, hair and furniture, and smoke can still drift indoors; children are especially exposed this way.',
      citation: 'WHO / Cochrane reviews on secondhand smoke'
    },
    {
      statement: 'Secondhand smoke is only a minor irritant, not a real health risk.',
      classification: 'Myth',
      explanation: 'WHO estimates secondhand smoke contributes to a significant number of deaths worldwide each year.',
      citation: 'WHO Tobacco Fact Sheet'
    },
    {
      statement: 'Children exposed to secondhand smoke at home are more likely to develop respiratory infections.',
      classification: 'Fact',
      explanation: 'Secondhand smoke exposure is linked to higher rates of respiratory illness in children.',
      citation: 'WHO / American Academy of Pediatrics — confirm with committee'
    },
    {
      statement: "Smoking is a private habit that has no effect on people who don't smoke.",
      classification: 'Myth',
      explanation: 'Secondhand and thirdhand smoke exposure affects household members and bystanders.',
      citation: 'WHO Tobacco Fact Sheet'
    },
    {
      statement: 'Opening a window while smoking indoors fully protects others in the room.',
      classification: 'Myth',
      explanation: 'Ventilation reduces but does not eliminate exposure to fine particulates and toxins.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Thirdhand smoke residue on surfaces and fabric can still expose people, especially babies who crawl and put things in their mouths.',
      classification: 'Fact',
      explanation: 'Residue from combustion settles and persists on surfaces long after smoking has stopped.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Smoking around pregnant women has no impact on the unborn baby.',
      classification: 'Myth',
      explanation: 'Secondhand smoke exposure during pregnancy is linked to risks including low birth weight.',
      citation: 'WHO / CDC — confirm with committee'
    },
    {
      statement: 'Households where one person smokes typically see higher rates of childhood respiratory illness than smoke-free households.',
      classification: 'Fact',
      explanation: 'Consistent finding across public health studies on household smoking exposure.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Switching to a non-combustible nicotine product removes the secondhand-exposure risk that comes from burning tobacco.',
      classification: 'Fact',
      explanation: "Without combustion there is no tar/smoke byproduct to expose bystanders to, though local regulation of specific products should guide final wording.",
      citation: 'Pending committee citation (PHE commentary on bystander exposure)'
    },
    {
      statement: 'Community smoking rates have no link to overall community health outcomes.',
      classification: 'Myth',
      explanation: 'Higher community smoking prevalence is associated with higher rates of smoking-related illness community-wide.',
      citation: 'Pending committee citation'
    },
    {
      statement: "Cigarette smoke contains roughly the same harmful chemicals whether it's inhaled directly or breathed in secondhand by someone nearby.",
      classification: 'Fact',
      explanation: 'Combustion produces the same range of toxins regardless of who inhales it first — direct smoker or bystander.',
      citation: 'Drug Science UK, "Nicotine"; Nicotine 2030 (Yach, 2026)'
    },
    {
      statement: 'A person addicted to nicotine who is unable to smoke for a few hours will usually feel calm and unaffected.',
      classification: 'Myth',
      explanation: 'Within roughly two hours of a cigarette, a dependent smoker typically starts to feel fidgety and stressed and their heart rate rises — this withdrawal cycle is part of why smoking in households repeats so predictably.',
      citation: 'Drug Science UK, "Nicotine"'
    },
    {
      statement: "Switching a household's smoker to a non-combustible nicotine product (vape, pouch, patch, gum) does not change what other household members are exposed to.",
      classification: 'Myth',
      explanation: 'Removing combustion removes the tar and smoke particulates that affect bystanders — the product still delivers nicotine to the user, but without the secondhand exposure pathway.',
      citation: 'Drug Science UK, "Nicotine"; Dr Mark Tyndall, "Let\'s Clear the Air" (The Globe and Mail, 2019) — confirm local wording with committee'
    },
    {
      statement: 'If cannabis is smoked mixed with tobacco, it has no extra effect on tobacco addiction.',
      classification: 'Myth',
      explanation: 'Smoking cannabis mixed with tobacco (common in some communities) is likely to reinforce cravings for and addiction to both substances, especially tobacco.',
      citation: 'Drug Science UK, "Nicotine"'
    },
    {
      statement: 'A smoker who also drinks alcohol heavily has a similar cancer risk to someone who only smokes.',
      classification: 'Myth',
      explanation: 'The combination of heavy smoking and heavy drinking raises the risk of mouth cancers substantially higher than either habit alone.',
      citation: 'Drug Science UK, "Nicotine"'
    },
    {
      statement: 'Public health experts who support seatbelts, helmets and other everyday harm-reduction measures are usually consistent in also supporting harm reduction for smoking.',
      classification: 'Myth (nuanced)',
      explanation: 'Many institutions that support harm reduction in other areas (seatbelts, helmets, condoms, needle exchanges) have historically been far more resistant to applying the same logic to vaping and other safer nicotine products — a tension worth surfacing, not resolving, in this game.',
      citation: 'Dr Mark Tyndall, blog commentary (drmarktyndall.com) — framing to be reviewed by committee'
    },
    {
      statement: 'Smoke-free home and car rules are among the most effective ways to protect children from secondhand smoke.',
      classification: 'Fact',
      explanation: 'Making homes and vehicles completely smoke-free is one of the most reliable ways to cut children\'s exposure, because they spend so much time in these enclosed spaces.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Air fresheners or scented sprays remove the health risks of secondhand smoke, not just the smell.',
      classification: 'Myth',
      explanation: 'Fragrances only mask odour. The fine particulates and toxic gases from combustion remain in the air and on surfaces regardless of how the room smells.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Smoking in only one room keeps the rest of the home completely smoke-free.',
      classification: 'Myth',
      explanation: 'Smoke and fine particles drift between rooms, and residue ("thirdhand smoke") spreads onto surfaces throughout the home, so no part of an indoor smoking household is truly smoke-free.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Pets living with smokers can also be affected by secondhand and thirdhand smoke.',
      classification: 'Fact',
      explanation: 'Animals breathe the same indoor air and pick up residue from their fur and surfaces, so smoking households can affect pets as well as people.',
      citation: 'Pending committee citation'
    }
  ],

  city: [
    {
      statement: 'Regulated vaping products are scientifically estimated to be around 95% less harmful than smoking combustible cigarettes.',
      classification: 'Fact',
      explanation: 'Applies specifically to regulated, tested vaping products — not unregulated devices. Confirm exact wording and local applicability with committee.',
      citation: 'Public Health England (2015), McNeill et al.; Dr Mark Tyndall cites the same Royal College of Physicians figure (drmarktyndall.com)'
    },
    {
      statement: 'Nicotine pouches and patches (NRT) involve no combustion at all.',
      classification: 'Fact',
      explanation: 'These products deliver nicotine without burning tobacco, avoiding tar and combustion byproducts.',
      citation: 'Pending committee citation'
    },
    {
      statement: "All vapes sold anywhere are automatically safe because they don't involve burning tobacco.",
      classification: 'Myth',
      explanation: 'The harm-reduction case applies to regulated, tested products specifically; unregulated or counterfeit devices carry unknown risks.',
      citation: 'Relevant national regulator guidance — pending committee'
    },
    {
      statement: "If someone isn't ready to try vaping, there are no other lower-risk alternatives to combustible cigarettes.",
      classification: 'Myth',
      explanation: 'Nicotine pouches, patches, gum and other NRT options exist as alternative steps on the harm-reduction ladder.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Vaping carries exactly the same risk as smoking because both involve inhaling nicotine.',
      classification: 'Myth',
      explanation: 'Risk is driven primarily by combustion byproducts, which regulated vapes do not produce; nicotine itself is not the primary harm driver.',
      citation: 'Royal College of Physicians (2016)'
    },
    {
      statement: "Switching from cigarettes to a regulated vape removes exposure to tar, since vapes don't burn tobacco.",
      classification: 'Fact',
      explanation: 'Tar is a combustion byproduct; products without combustion do not produce it.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Nicotine replacement therapy (patches, gum) can help reduce cravings without exposure to combustion byproducts.',
      classification: 'Fact',
      explanation: 'NRT delivers nicotine without burning tobacco.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'The hand-to-mouth ritual and timing of smoking has no bearing on why some people prefer vaping over patches.',
      classification: 'Myth',
      explanation: 'Many smokers find vaping easier to switch to because it mimics the physical ritual and timing of smoking, acting as a behavioural bridge away from combustion.',
      citation: 'Behavioural literature on smoking ritual — pending committee'
    },
    {
      statement: 'Once someone has switched to a non-combustible product, there is no further benefit to eventually reducing nicotine use.',
      classification: 'Myth (nuanced)',
      explanation: 'Removing combustion is the primary urgent health gain; longer-term reduction of nicotine dependence is a separate, secondary goal. Committee to confirm framing.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'There is only one "right" alternative to smoking, and if it doesn\'t suit you, there\'s nothing else to try.',
      classification: 'Myth',
      explanation: 'This is the core "buffet" idea — if one alternative doesn\'t work, others (vapes, pouches, patches, gum) are available to try.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'E-cigarettes can fairly be described as a harm-reduction tool, in the same family as seatbelts or helmets — they make a risky activity less dangerous for people unable or unwilling to stop it.',
      classification: 'Fact (framing)',
      explanation: 'This is the core definition of harm reduction applied to smoking: reducing risk for the behaviour people are actually engaging in, rather than demanding abstinence as the only acceptable outcome.',
      citation: 'Dr Mark Tyndall, drmarktyndall.com blog — framing to be reviewed by committee'
    },
    {
      statement: 'The 2019–2020 outbreak of severe vaping-related lung injuries in the US ("EVALI") was caused by nicotine vaping products.',
      classification: 'Myth',
      explanation: 'Investigations traced the large majority of EVALI cases to illicit, bootleg THC vaping liquids containing vitamin E acetate — not commercially regulated nicotine vaping products.',
      citation: 'US CDC investigation findings, as summarised by Dr Mark Tyndall (drmarktyndall.com) — confirm exact figures with committee'
    },
    {
      statement: 'Scientific studies on vaping are sometimes retracted after publication because of serious methodological flaws.',
      classification: 'Fact',
      explanation: 'A widely cited study linking vaping to heart attacks was retracted by the Journal of the American Heart Association after its methodology was found to be seriously flawed — a caution against treating every published vaping study as settled science.',
      citation: 'Journal of the American Heart Association retraction, as discussed by Dr Mark Tyndall (drmarktyndall.com) — confirm specifics with committee'
    },
    {
      statement: 'Tobacco harm reduction is a fringe, minority position among addiction medicine and harm reduction specialists.',
      classification: 'Myth',
      explanation: 'Tobacco harm reduction is championed by senior harm reduction physicians internationally, including the founding president of the International Harm Reduction Association — it is a mainstream extension of harm reduction principles already applied to other risk behaviours.',
      citation: 'Dr Alex Wodak AM, Tobacco Harm Reduction Advisor, Harm Reduction Australia — confirm framing with committee'
    },
    {
      statement: 'People who smoke do so because they enjoy combustion and smoke specifically.',
      classification: 'Myth',
      explanation: 'People smoke for the nicotine; the serious harm and death come from the way it is delivered — by burning tobacco and inhaling the smoke.',
      citation: 'Paraphrase of Sir Michael Russell, cited by Dr Alex Wodak — confirm exact wording/attribution with committee'
    },
    {
      statement: 'A smoker who is offered no safer alternative to cigarettes is just as likely to quit nicotine entirely as one who is offered a vape, pouch or patch.',
      classification: 'Myth (nuanced)',
      explanation: 'Many smokers who cannot or will not quit nicotine outright can still substantially reduce harm by switching to a non-combustible product — this is the rationale for offering a "buffet" of options rather than an abstinence-only message.',
      citation: 'Dr Mark Tyndall, "Let\'s Clear the Air" (The Globe and Mail, 2019); Dr Alex Wodak commentary — confirm framing with committee'
    },
    {
      statement: 'Secondhand vapour from a regulated e-cigarette exposes bystanders to the same harmful combustion chemicals as cigarette smoke.',
      classification: 'Myth',
      explanation: 'With no combustion there is far less to inhale: regulated vapour contains fewer and lower-level toxicants than cigarette smoke. It is not proven completely risk-free, but it is not comparable to secondhand smoke.',
      citation: 'Pending committee citation (bystander exposure comparison)'
    },
    {
      statement: 'Using a vape while still smoking a few cigarettes a day ("dual use") gives almost the same benefit as switching completely.',
      classification: 'Myth',
      explanation: 'The biggest health gains come from removing combustion entirely. Continuing to smoke even a little keeps much of the risk, so the goal is a complete switch rather than cutting down alongside smoking.',
      citation: 'Dr Mark Tyndall commentary; pending committee citation'
    },
    {
      statement: 'Heated tobacco products and e-cigarettes (vapes) are the same thing.',
      classification: 'Myth',
      explanation: 'Heated tobacco heats real tobacco leaf without fully burning it, while e-cigarettes vaporise a nicotine liquid that contains no tobacco leaf. They are different product categories and are often regulated differently.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Flavoured vaping products can help some adult smokers move away from cigarettes.',
      classification: 'Fact (framing)',
      explanation: 'Evidence suggests non-tobacco flavours help some adults switch away from smoking. This benefit has to be weighed against concerns about youth appeal, so local regulation should guide any public messaging.',
      citation: 'Pending committee citation — balance with youth-access evidence'
    }
  ],

  nation: [
    {
      statement: 'Tobacco-related illness places a significant cost burden on national healthcare systems.',
      classification: 'Fact',
      explanation: 'Treatment of smoking-related disease is a major and well-documented cost to health systems globally.',
      citation: 'WHO / national health economics studies — pending committee figures'
    },
    {
      statement: 'Reducing national smoking rates has no measurable effect on workplace productivity.',
      classification: 'Myth',
      explanation: 'Smoking-related illness contributes to absenteeism and lost productivity; reductions in smoking are associated with measurable economic gains.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'Tobacco harm reduction policy only benefits individual smokers, not the wider public.',
      classification: 'Myth',
      explanation: 'Lower combustion rates reduce secondhand exposure and healthcare burden community-wide.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'South Africa is the only African country grappling with a high tobacco-related disease burden.',
      classification: 'Myth',
      explanation: 'Tobacco use is a major public health issue across many Sub-Saharan African countries, which is part of why this game is designed for regional, not just local, use.',
      citation: 'WHO Africa region tobacco reports; Nicotine 2030 (Yach, 2026)'
    },
    {
      statement: 'National tobacco control policies have no measurable impact on smoking prevalence over time.',
      classification: 'Myth',
      explanation: 'Countries that adopted comprehensive tobacco control measures have seen measurable declines in smoking prevalence.',
      citation: 'WHO FCTC progress reports'
    },
    {
      statement: "Public misinformation about nicotine vs. combustion is rare and doesn't significantly affect national health outcomes.",
      classification: 'Myth',
      explanation: 'Widespread public misunderstanding of nicotine vs. combustion risk is a recognised barrier to harm reduction uptake at population scale — the core rationale for this game.',
      citation: 'Pending committee citation'
    },
    {
      statement: "Once a country's smoking rate drops, secondhand exposure for non-smokers drops too.",
      classification: 'Fact',
      explanation: 'Fewer people smoking means less secondhand smoke exposure across the population.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'There is no economic case for offering harm reduction alternatives at a national policy level.',
      classification: 'Myth',
      explanation: 'Reduced combustion-related disease burden carries downstream economic benefits at a population level.',
      citation: 'Pending committee citation'
    },
    {
      statement: 'A national reduction in smoking-attributable disease has no effect on life expectancy statistics.',
      classification: 'Myth',
      explanation: 'Tobacco control is recognised as one contributor to national gains in life expectancy.',
      citation: 'WHO — pending committee figures'
    },
    {
      statement: 'Tobacco harm reduction messaging that works in one country can be applied unchanged everywhere without considering local regulation.',
      classification: 'Myth',
      explanation: 'This is precisely why every claim in this game requires country-specific committee and legal review before release in a new market.',
      citation: 'N/A — governance principle, not a clinical citation'
    },
    {
      statement: 'Nigeria and Ethiopia have very low recorded smoking rates mainly because of successful harm-reduction switching to vapes and pouches.',
      classification: 'Myth',
      explanation: 'Their low smoking rates are attributed mainly to strong cultural and religious norms against smoking, not to harm-reduction product adoption — an important distinction when designing messaging for those markets.',
      citation: 'Nicotine 2030 (Yach, 2026) — figures to be confirmed by committee'
    },
    {
      statement: 'Population growth in some African countries could mean the absolute number of smokers rises even while the smoking rate (percentage) falls.',
      classification: 'Fact',
      explanation: 'A falling rate can still mean a growing number of people smoking in absolute terms if the overall population is growing quickly — relevant to long-term national planning.',
      citation: 'Nicotine 2030 (Yach, 2026) — confirm figures with committee'
    },
    {
      statement: 'Kenya and South Africa are both currently working on regulatory frameworks for tobacco harm reduction products.',
      classification: 'Fact',
      explanation: 'Both countries are cited as being in the process of developing harm-reduction-relevant regulatory frameworks — exact legal status changes over time and must be verified before any public claim is made.',
      citation: 'Nicotine 2030 (Yach, 2026) — verify current legal status with committee before publication'
    },
    {
      statement: 'There is an African-based advocacy network specifically focused on harm reduction across the continent.',
      classification: 'Fact',
      explanation: 'The African Harm Reduction Alliance is referenced as a relevant consumer-advocacy network for harm reduction issues in Africa.',
      citation: 'Nicotine 2030 (Yach, 2026) — confirm current name/status with committee'
    },
    {
      statement: "People living with HIV in Sub-Saharan Africa have smoking rates and risks that are no different from the general population, so tobacco harm reduction isn't a relevant equity issue for them.",
      classification: 'Myth',
      explanation: 'Populations living with HIV/AIDS in the region can face compounded respiratory and cardiovascular risk; equity-focused harm reduction messaging should consider these overlapping health burdens.',
      citation: 'Pending committee citation — equity framing flagged in Nicotine 2030 (Yach, 2026)'
    },
    {
      statement: 'The report "Nicotine 2030" that informed parts of this game\'s content was produced independently with no industry funding.',
      classification: 'Myth (disclosure)',
      explanation: 'The report was supported by a nicotine-product company (Zanoprima Lifesciences). It is included as a source of ideas and data points, not as a neutral systematic review — every figure drawn from it is flagged for committee verification rather than treated as settled fact.',
      citation: 'Nicotine 2030 (Yach, 2026), publisher disclosure — governance note, not a clinical citation'
    },
    {
      statement: 'Tobacco taxes are one of the most effective national tools for reducing smoking rates.',
      classification: 'Fact',
      explanation: 'Raising the price of cigarettes through taxation is consistently one of the strongest measures for lowering smoking, especially among young people and lower-income groups.',
      citation: 'WHO MPOWER / FCTC — confirm figures with committee'
    },
    {
      statement: 'Raising tobacco taxes simply increases cigarette smuggling and does nothing to reduce smoking.',
      classification: 'Myth (nuanced)',
      explanation: 'Illicit trade is a real concern that needs enforcement, but the evidence is that higher tobacco taxes still reduce overall smoking — the smuggling argument is often overstated by the tobacco industry.',
      citation: 'WHO / tobacco economics literature — confirm framing with committee'
    },
    {
      statement: 'National quitlines and cessation support services help more people stop smoking successfully.',
      classification: 'Fact',
      explanation: 'Free, accessible support such as quitlines and cessation counselling measurably improves the chances of quitting compared with trying alone.',
      citation: 'WHO MPOWER — pending committee figures'
    },
    {
      statement: 'Banning safer nicotine alternatives has no effect on whether people keep smoking cigarettes.',
      classification: 'Myth',
      explanation: 'Removing access to lower-risk products can leave combustible cigarettes as the most available option, which may keep more people smoking — a key reason regulation, not prohibition, is debated at national level.',
      citation: 'Pending committee citation — verify against local regulatory context'
    }
  ]
};

// --------------- CONFIG ---------------

const SUBLEVELS = [
  {
    id: 'body',
    name: 'The Body',
    scene: 'X-ray: lungs & combustion',
    num: '01',
    menuImage: 'assets/my_village.jpg',
    bgImage:   'assets/xray_man.jpg',       // revealed underneath (healthy: pink lungs, green, blue sky)
    smokeImage:'assets/xray_man1.jpg'       // #1: sliced into 20 blocks (before: smoking, grey lungs, smoke)
  },
  {
    id: 'village',                          // internal id kept as 'village' (data/save compatibility)
    name: 'The Town',
    scene: 'Secondhand smoke',
    num: '02',
    menuImage: 'assets/my_town.jpg',
    bgImage:   'assets/town2.jpg',          // revealed underneath (clean: blue sky, no smoke)
    smokeImage:'assets/town.jpg'            // #1: sliced into 20 blocks (dirty: smoking, factory smoke)
  },
  {
    id: 'city',
    name: 'The City',
    scene: 'Harm Reduction Buffet',
    num: '03',
    menuImage: 'assets/my_city.jpg',
    bgImage:   'assets/city_man.jpg',        // revealed underneath as blocks clear
    smokeImage:'assets/city_man_smoke.jpg'   // #1: sliced into the 20 blocks (before image)
  },
  {
    id: 'nation',
    name: 'The Nation',
    scene: 'National scale',
    num: '04',
    menuImage: 'assets/my_country.jpg',
    bgImage:   'assets/the_nation1.jpg',    // revealed underneath (clean: "SUPPORT HARM REDUCTION", alternatives)
    smokeImage:'assets/the_nation.jpg'      // #1: sliced into 20 blocks (dirty: "NO HARM REDUCTION", smoking)
  }
];

const GRID_SIZE = 20; // 5 cols x 4 rows
const ROUND_SIZE = 20; // draws min(pool.length, 20) — Body pool has 20, others 16
const SWIPE_THRESHOLD = 70; // px of horizontal drag to register a swipe
const UNLOCK_STARS = 2; // >=2 stars (>=75%) unlocks the next sublevel; 3 stars (100%) = mastery
const ARCADE_LIVES = 3;       // #5 arcade: lives per round
const QUESTION_TIME = 15;     // #5 arcade: seconds per question
const SAVE_KEY = 'cta_save_v2'; // v2 fork — separate from stable v1 progress on same origin

// Final completion page: the harm-reduction infographic opened by the
// "View the infographic" button. (Can be swapped for an external URL later.)
var INFOGRAPHIC_URL = 'assets/Tobacco_Harm_Reduction_Guide.jpg';

// --------------- I18N (#8 UI scaffold) ---------------
// UI chrome only. Clinical question content stays English pending committee
// translation. Add a language by adding a block here + a button in renderOptions.

var LANGUAGES = [
  { code: 'en', label: 'ENGLISH' },
  { code: 'fr', label: 'FRANÇAIS' },
  { code: 'pt', label: 'PORTUGUÊS' },
  { code: 'sw', label: 'KISWAHILI' }
];

var STRINGS = {
  en: {
    titleLogo:'SCIHRIA presents', titleSub:'A HARM REDUCTION GAME',
    play:'PLAY GAME', howto:'HOW TO PLAY', about:'ABOUT', options:'OPTIONS',
    back:'← BACK', backMap:'← MAP', menu:'← MENU', continue:'▶ CONTINUE',
    tryAgain:'▶ TRY AGAIN', seeReview:'📋 SEE REVIEW',
    myth:'✗ MYTH', fact:'FACT ✓',
    selectSublevel:'SELECT A SUBLEVEL', roundReview:'ROUND REVIEW',
    footer:'SWIPE / ◄ = MYTH  |  SWIPE / ► = FACT',
    optMode:'GAME MODE', optModeLearn:'LEARN', optModeArcade:'ARCADE',
    optFeedback:'FEEDBACK', optFeedbackEnd:'END OF ROUND', optFeedbackInstant:'INSTANT',
    optLanguage:'LANGUAGE', optSound:'SOUND', on:'ON', off:'OFF'
  },
  fr: {
    titleLogo:'SCIHRIA présente', titleSub:'UN JEU DE RÉDUCTION DES RISQUES',
    play:'JOUER', howto:'COMMENT JOUER', about:'À PROPOS', options:'OPTIONS',
    back:'← RETOUR', backMap:'← CARTE', menu:'← MENU', continue:'▶ CONTINUER',
    tryAgain:'▶ RÉESSAYER', seeReview:'📋 VOIR LE BILAN',
    myth:'✗ MYTHE', fact:'FAIT ✓',
    selectSublevel:'CHOISIR UN NIVEAU', roundReview:'BILAN DE LA MANCHE',
    footer:'GLISSER / ◄ = MYTHE  |  GLISSER / ► = FAIT',
    optMode:'MODE DE JEU', optModeLearn:'APPRENTISSAGE', optModeArcade:'ARCADE',
    optFeedback:'RETOUR', optFeedbackEnd:'FIN DE MANCHE', optFeedbackInstant:'IMMÉDIAT',
    optLanguage:'LANGUE', optSound:'SON', on:'OUI', off:'NON'
  },
  pt: {
    titleLogo:'SCIHRIA apresenta', titleSub:'UM JOGO DE REDUÇÃO DE DANOS',
    play:'JOGAR', howto:'COMO JOGAR', about:'SOBRE', options:'OPÇÕES',
    back:'← VOLTAR', backMap:'← MAPA', menu:'← MENU', continue:'▶ CONTINUAR',
    tryAgain:'▶ TENTAR DE NOVO', seeReview:'📋 VER REVISÃO',
    myth:'✗ MITO', fact:'FACTO ✓',
    selectSublevel:'ESCOLHER UM NÍVEL', roundReview:'REVISÃO DA RONDA',
    footer:'DESLIZAR / ◄ = MITO  |  DESLIZAR / ► = FACTO',
    optMode:'MODO DE JOGO', optModeLearn:'APRENDER', optModeArcade:'ARCADE',
    optFeedback:'FEEDBACK', optFeedbackEnd:'FIM DA RONDA', optFeedbackInstant:'IMEDIATO',
    optLanguage:'IDIOMA', optSound:'SOM', on:'SIM', off:'NÃO'
  },
  sw: {
    titleLogo:'SCIHRIA inawasilisha', titleSub:'MCHEZO WA KUPUNGUZA MADHARA',
    play:'CHEZA', howto:'JINSI YA KUCHEZA', about:'KUHUSU', options:'MIPANGILIO',
    back:'← RUDI', backMap:'← RAMANI', menu:'← MENYU', continue:'▶ ENDELEA',
    tryAgain:'▶ JARIBU TENA', seeReview:'📋 ANGALIA MAPITIO',
    myth:'✗ UONGO', fact:'KWELI ✓',
    selectSublevel:'CHAGUA NGAZI', roundReview:'MAPITIO YA RAUNDI',
    footer:'TELEZESHA / ◄ = UONGO  |  TELEZESHA / ► = KWELI',
    optMode:'AINA YA MCHEZO', optModeLearn:'KUJIFUNZA', optModeArcade:'ARCADE',
    optFeedback:'MREJESHO', optFeedbackEnd:'MWISHO WA RAUNDI', optFeedbackInstant:'PAPO HAPO',
    optLanguage:'LUGHA', optSound:'SAUTI', on:'WASHA', off:'ZIMA'
  }
};

function t(key) {
  var L = STRINGS[state.lang] || STRINGS.en;
  return (key in L) ? L[key] : (STRINGS.en[key] || key);
}

// Apply translations to all static UI elements (call on load + language change)
function applyTranslations() {
  function setText(id, val) { var e = el(id); if (e) e.textContent = val; }
  function setClass(sel, val) { var e = document.querySelector(sel); if (e) e.textContent = val; }

  setClass('.title-sub', t('titleSub'));
  setText('btn-play', t('play'));
  setText('btn-howto', t('howto'));
  setText('btn-about', t('about'));
  setText('btn-options', t('options'));
  setText('btn-map-back', t('menu'));
  setClass('.map-subtitle', t('selectSublevel'));
  setText('btn-myth', t('myth'));
  setText('btn-fact', t('fact'));
  setClass('.game-footer', t('footer'));
  setClass('.review-title', t('roundReview'));
  setText('btn-review-action', t('tryAgain'));
  setText('btn-review-map', t('backMap'));
  setText('btn-result-review', t('seeReview'));
  setText('btn-result-try', t('tryAgain'));
  setText('btn-result-map', t('backMap'));
  setText('btn-doctor-continue', t('continue'));
  setText('btn-doctor-back', t('backMap'));
  setText('btn-howto-close', t('back'));
  setText('btn-about-close', t('back'));
  setText('btn-options-back', t('back'));
}

// --------------- STATE ---------------

const state = {
  unlockedUpTo: 0,
  // NOTE: the smoke grid resets every round (a fresh puzzle each play). The
  // live round's cleared slots live on state.current.clearedSlots; map
  // progress is tracked by bestStars below.
  bestStars: {
    body: 0, village: 0, city: 0, nation: 0
  },
  muted: false,
  // Settings (#4/#5/#8)
  mode:     'learn',  // 'learn' | 'arcade'
  feedback: 'end',    // 'end' | 'instant'
  lang:     'en',     // 'en' | 'fr' | 'pt' | 'sw'
  current: null
};

// --------------- UTILITIES ---------------

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

function baseClassification(cls) {
  if (cls.startsWith('Myth')) return 'Myth';
  return 'Fact';
}

// --------------- CONTENT METADATA (#6 data layer) ---------------
// Lightweight, derived metadata layer over the question pools so content
// can be categorised, tagged by difficulty, and filtered by review status
// without changing the question objects themselves. Per-question overrides
// (q.category / q.difficulty / q.approved) take precedence if added later.

var CATEGORY_BY_SUBLEVEL = {
  body:    'Body & Combustion',
  village: 'Household & Secondhand',
  city:    'Safer Alternatives',
  nation:  'Policy & Population'
};

// Set true to draw ONLY committee-approved questions (review pipeline switch).
var ONLY_APPROVED = false;

function questionApproved(q) {
  if (typeof q.approved === 'boolean') return q.approved;
  // Heuristic: citations we flagged as needing the committee are "pending".
  return !/pending|confirm|verif|to be |independently/i.test(q.citation || '');
}

function questionCategory(q, sublevelId) {
  return q.category || CATEGORY_BY_SUBLEVEL[sublevelId] || '';
}

function questionDifficulty(q) {
  return q.difficulty || 'core';
}

// --------------- AUDIO (Web Audio API, no asset files) ---------------

var _audioCtx = null;

function audioCtx() {
  if (!_audioCtx) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC) _audioCtx = new AC();
  }
  // Browsers suspend the context until a user gesture; resume on demand.
  if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// Play a single square-wave "chip" tone.
function tone(freq, startOffset, dur, vol) {
  var ctx = audioCtx();
  if (!ctx || state.muted) return;
  var t = ctx.currentTime + startOffset;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

function sfxCorrect() { tone(660, 0, 0.08, 0.15); tone(990, 0.07, 0.12, 0.15); }
function sfxWrong()   { tone(200, 0, 0.18, 0.18); tone(150, 0.08, 0.18, 0.18); }
function sfxClick()   { tone(440, 0, 0.05, 0.10); }
function sfxClear()   {
  [523, 659, 784, 1047].forEach(function(f, i) { tone(f, i * 0.09, 0.18, 0.16); });
}

// --------------- PERSISTENCE (localStorage) ---------------

function saveProgress() {
  try {
    var data = {
      unlockedUpTo: state.unlockedUpTo,
      bestStars: state.bestStars,
      muted: state.muted,
      mode: state.mode,
      feedback: state.feedback,
      lang: state.lang
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) { /* storage unavailable — progress stays in-memory only */ }
}

function loadProgress() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    var data = JSON.parse(raw);
    if (typeof data.unlockedUpTo === 'number') state.unlockedUpTo = data.unlockedUpTo;
    if (typeof data.muted === 'boolean') state.muted = data.muted;
    if (data.mode === 'learn' || data.mode === 'arcade') state.mode = data.mode;
    if (data.feedback === 'end' || data.feedback === 'instant') state.feedback = data.feedback;
    if (STRINGS[data.lang]) state.lang = data.lang;
    if (data.bestStars) {
      SUBLEVELS.forEach(function(s) {
        if (typeof data.bestStars[s.id] === 'number') state.bestStars[s.id] = data.bestStars[s.id];
      });
    }
  } catch (e) { /* corrupt or unavailable — start fresh */ }
}

// --------------- DOM HELPERS ---------------

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function el(id) {
  return document.getElementById(id);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --------------- TITLE SCREEN ---------------

function initTitleScreen() {
  el('btn-play').addEventListener('click', function() {
    sfxClick(); // also resumes the audio context on first user gesture
    renderMapScreen();
    showScreen('screen-map');
  });

  el('btn-howto').addEventListener('click', function() {
    el('overlay-howto').classList.add('active');
  });
  el('btn-howto-close').addEventListener('click', function() {
    el('overlay-howto').classList.remove('active');
  });

  el('btn-about').addEventListener('click', function() {
    el('overlay-about').classList.add('active');
  });
  el('btn-about-close').addEventListener('click', function() {
    el('overlay-about').classList.remove('active');
  });

  el('btn-options').addEventListener('click', function() {
    sfxClick();
    renderOptions();
    showScreen('screen-options');
  });
  el('btn-options-back').addEventListener('click', function() {
    showScreen('screen-title');
  });
}

// --------------- OPTIONS SCREEN (#4 / #5 / #8) ---------------

function buildOptionRow(label, choices, activeVal, onPick) {
  var row = document.createElement('div');
  row.className = 'option-row';
  var lab = document.createElement('div');
  lab.className = 'option-label';
  lab.textContent = label;
  row.appendChild(lab);
  var wrap = document.createElement('div');
  wrap.className = 'option-choices';
  choices.forEach(function(c) {
    var b = document.createElement('button');
    b.className = 'option-btn' + (c.val === activeVal ? ' active' : '');
    b.textContent = c.label;
    b.addEventListener('click', function() { sfxClick(); onPick(c.val); });
    wrap.appendChild(b);
  });
  row.appendChild(wrap);
  return row;
}

function renderOptions() {
  el('options-title').textContent = t('options');
  var body = el('options-body');
  body.innerHTML = '';

  body.appendChild(buildOptionRow(t('optMode'), [
    { val: 'learn',  label: t('optModeLearn') },
    { val: 'arcade', label: t('optModeArcade') }
  ], state.mode, function(v) { state.mode = v; saveProgress(); renderOptions(); }));

  body.appendChild(buildOptionRow(t('optFeedback'), [
    { val: 'end',     label: t('optFeedbackEnd') },
    { val: 'instant', label: t('optFeedbackInstant') }
  ], state.feedback, function(v) { state.feedback = v; saveProgress(); renderOptions(); }));

  body.appendChild(buildOptionRow(t('optSound'), [
    { val: false, label: t('on') },   // sound ON  = not muted
    { val: true,  label: t('off') }   // sound OFF = muted
  ], state.muted, function(v) { state.muted = v; updateMuteButton(); saveProgress(); renderOptions(); if (!v) sfxClick(); }));

  var langChoices = LANGUAGES.map(function(l) { return { val: l.code, label: l.label }; });
  body.appendChild(buildOptionRow(t('optLanguage'), langChoices, state.lang, function(v) {
    state.lang = v; saveProgress(); applyTranslations(); renderOptions();
  }));

  var note = document.createElement('div');
  note.className = 'option-note';
  note.textContent = 'Menus are translated. Question content stays in English pending committee translation.';
  body.appendChild(note);
}

// --------------- MAP SCREEN ---------------

function renderMapScreen() {
  var container = el('map-grid');
  container.innerHTML = '';

  SUBLEVELS.forEach(function(cfg, idx) {
    var locked = idx > state.unlockedUpTo;
    var bestSt = state.bestStars[cfg.id];
    var pct = Math.round((bestSt / 3) * 100); // map progress now reflects mastery (stars), not blocks

    var card = document.createElement('div');
    card.className = 'sublevel-card' + (locked ? ' locked' : '');
    card.dataset.sublevel = cfg.id;

    if (cfg.menuImage) {
      var img = document.createElement('img');
      img.className = 'sublevel-bg-img';
      img.src = cfg.menuImage;
      img.alt = '';
      card.appendChild(img);
    }

    var starsHtml = bestSt > 0
      ? '<div class="sublevel-stars">' + starsDisplay(bestSt) + '</div>'
      : '';
    var statusLabel = locked ? 'LOCKED'
      : bestSt >= 3 ? 'MASTERED'
      : bestSt >= 2 ? 'CLEARED'
      : bestSt >= 1 ? 'KEEP GOING'
      : 'NEW';

    var info = document.createElement('div');
    info.className = 'sublevel-info';
    info.innerHTML =
      '<div class="sublevel-num">LEVEL ' + cfg.num + '</div>' +
      '<div class="sublevel-name">' + cfg.name + '</div>' +
      '<div class="sublevel-scene">' + cfg.scene + '</div>' +
      starsHtml +
      '<div class="sublevel-status">' +
        '<div class="grid-progress">' +
          '<div class="grid-progress-fill" style="width:' + pct + '%"></div>' +
        '</div>' +
        '<div class="sublevel-pct">' + statusLabel + '</div>' +
      '</div>';
    card.appendChild(info);

    if (locked) {
      var lock = document.createElement('div');
      lock.className = 'lock-icon';
      lock.textContent = '🔒';
      card.appendChild(lock);
    } else {
      card.addEventListener('click', function() {
        showDoctorIntro(cfg.id);
      });
    }

    container.appendChild(card);
  });
}

// --------------- DOCTOR INTRO (#2) ---------------

var DOCTOR_LINES = {
  body:    "Let's start with the body. Remember — it's the smoke from burning tobacco that does the real damage, not nicotine itself. Spot the myths!",
  village: "Now, the town. Smoke doesn't stay with the smoker — it reaches family and neighbours too. Sort the facts from the myths.",
  city:    "In the city, people have safer choices than cigarettes. Let's see what harm reduction really means.",
  nation:  "Finally, the whole nation. Smart policy can protect millions of people. Show me what you know!"
};

var pendingSublevel = null;

function showDoctorIntro(sublevelId) {
  pendingSublevel = sublevelId;
  el('doctor-line').textContent = DOCTOR_LINES[sublevelId] || '';
  sfxClick();
  showScreen('screen-doctor');
}

// --------------- ARCADE MODE (#5) ---------------

var _timerId = null;

function stopTimer() {
  if (_timerId) { clearInterval(_timerId); _timerId = null; }
}

function startTimer() {
  if (!state.current || !state.current.arcade) return;
  stopTimer();
  var left = QUESTION_TIME;
  renderTimer(left);
  _timerId = setInterval(function() {
    left--;
    renderTimer(left);
    if (left <= 0) { stopTimer(); onTimeout(); }
  }, 1000);
}

function renderTimer(sec) {
  var e = el('game-timer');
  if (!e) return;
  e.textContent = '⏱' + Math.max(0, sec);
  if (sec <= 5) e.classList.add('warn'); else e.classList.remove('warn');
}

function onTimeout() {
  if (!state.current || state.current.locked) return;
  resolveAnswer('__timeout__'); // never matches a classification → counts as wrong
}

function updateLives() {
  var e = el('game-lives');
  if (!e) return;
  var cur = state.current;
  e.textContent = (cur && cur.arcade) ? '❤'.repeat(Math.max(0, cur.lives)) : '';
}

function applyModeUI(arcade) {
  el('game-lives').style.display = arcade ? 'inline-block' : 'none';
  el('game-timer').style.display = arcade ? 'inline-block' : 'none';
}

// --------------- GAME SCREEN ---------------

function beginSublevel(sublevelId) {
  stopTimer();
  el('feedback-overlay').classList.remove('active');
  var pool = QUESTION_POOLS[sublevelId];
  if (ONLY_APPROVED) pool = pool.filter(questionApproved); // review-pipeline filter
  var draw = sample(pool, Math.min(pool.length, ROUND_SIZE));

  var arcade = (state.mode === 'arcade');
  state.current = {
    sublevelId: sublevelId,
    draw: draw,
    idx: 0,
    score: 0,
    streak: 0,
    locked: false,
    arcade: arcade,
    lives: arcade ? ARCADE_LIVES : 0,
    gameOver: false,
    clearedSlots: new Set(), // smoke blocks cleared THIS round (fresh puzzle each play)
    answers: []
  };

  renderGameScreen(sublevelId);
  applyModeUI(arcade);
  updateLives();
  showScreen('screen-game');
  renderGrid(sublevelId);
  resetCard();
  showQuestion(0);
}

function renderGameScreen(sublevelId) {
  var cfg = SUBLEVELS.find(function(s) { return s.id === sublevelId; });

  el('game-sublevel-name').textContent = cfg.name.toUpperCase();
  el('game-score').textContent = 'SCORE: 0';
  el('game-qcount').textContent = 'Q 1/' + state.current.draw.length;
  el('game-streak').className = 'game-streak';
  el('game-streak').textContent = '';
  el('game-progress-fill').style.width = '0%';
  updateMuteButton();

  var sceneContainer = el('scene-container');
  sceneContainer.dataset.sublevel = sublevelId;

  var oldImg = sceneContainer.querySelector('.scene-bg');
  if (oldImg) oldImg.remove();

  if (cfg.bgImage) {
    var img = document.createElement('img');
    img.className = 'scene-bg';
    img.src = cfg.bgImage;
    img.alt = '';
    sceneContainer.insertBefore(img, sceneContainer.firstChild);
  }
}

// Cache of natural image dimensions, keyed by src (for smoke-slice layout).
var _smokeImgDims = {};

function renderGrid(sublevelId) {
  var overlay = el('grid-overlay');
  overlay.innerHTML = '';
  var cleared = state.current.clearedSlots; // live round only — starts empty, so a fresh smoke puzzle every play
  var cfg = SUBLEVELS.find(function(s) { return s.id === sublevelId; });
  var smoke = cfg && cfg.smokeImage;

  overlay.classList.toggle('smoke-grid', !!smoke);

  for (var i = 0; i < GRID_SIZE; i++) {
    var cell = document.createElement('div');
    cell.className = 'grid-cell' + (cleared.has(i) ? ' cleared' : '') + (smoke ? ' smoke-cell' : '');
    cell.dataset.blockIdx = i;
    overlay.appendChild(cell);
  }

  if (smoke) scheduleSmokeLayout(smoke);
}

// #1: paint each block with its slice of the "before" smoke image, aligned to
// match the clean image's object-fit:cover/center-top render underneath.
function scheduleSmokeLayout(src) {
  if (_smokeImgDims[src]) {
    requestAnimationFrame(function() { layoutSmokeCells(src); });
    return;
  }
  var img = new Image();
  img.onload = function() {
    _smokeImgDims[src] = { w: img.naturalWidth, h: img.naturalHeight };
    requestAnimationFrame(function() { layoutSmokeCells(src); });
  };
  img.src = src;
}

function layoutSmokeCells(src) {
  var dims = _smokeImgDims[src];
  if (!dims) return;
  var overlay = el('grid-overlay');
  var W = overlay.clientWidth, H = overlay.clientHeight;
  if (!W || !H) return;

  // Replicate object-fit:cover with object-position:center top.
  var scale = Math.max(W / dims.w, H / dims.h);
  var dispW = dims.w * scale, dispH = dims.h * scale;
  var offX = (W - dispW) / 2; // centred horizontally
  var offY = 0;               // top-aligned
  var cellW = W / 5, cellH = H / 4;

  var cells = overlay.querySelectorAll('.smoke-cell');
  for (var i = 0; i < cells.length; i++) {
    var col = i % 5, row = Math.floor(i / 5);
    var c = cells[i];
    c.style.backgroundImage = 'url("' + src + '")';
    c.style.backgroundRepeat = 'no-repeat';
    c.style.backgroundSize = dispW + 'px ' + dispH + 'px';
    c.style.backgroundPosition = (offX - col * cellW) + 'px ' + (offY - row * cellH) + 'px';
  }
}

function showQuestion(idx) {
  var cur = state.current;
  var q = cur.draw[idx];

  el('statement-text').textContent = q.statement;
  el('game-score').textContent = 'SCORE: ' + cur.score;
  el('game-qcount').textContent = 'Q ' + (idx + 1) + '/' + cur.draw.length;
  el('game-progress-fill').style.width = ((idx / cur.draw.length) * 100) + '%';
  if (cur.arcade) startTimer(); else stopTimer();
}

// Reset the swipe card to its centred resting state and replay the
// brief enter animation. Called between questions.
function resetCard() {
  var card = el('swipe-card');
  card.classList.remove('dragging');
  card.style.transition = '';
  card.style.transform = '';
  card.style.opacity = '';
  el('stamp-myth').style.opacity = 0;
  el('stamp-fact').style.opacity = 0;
  // Restart the enter animation
  card.classList.remove('enter');
  void card.offsetWidth; // force reflow so the animation re-runs
  card.classList.add('enter');
}

// Single entry point for an answer, from button / keyboard / swipe.
function answer(choice) {
  var cur = state.current;
  if (!cur || cur.locked) return;
  cur.locked = true;
  flyOut(choice);
}

// Animate the card off-screen in the chosen direction, then resolve.
function flyOut(choice) {
  var card = el('swipe-card');
  var dir = (choice === 'Myth') ? -1 : 1;
  card.classList.remove('dragging');
  card.style.transition = 'transform 0.22s ease, opacity 0.22s ease';
  card.style.transform = 'translateX(' + (dir * 480) + 'px) rotate(' + (dir * 18) + 'deg)';
  card.style.opacity = '0';
  el('stamp-' + (dir < 0 ? 'myth' : 'fact')).style.opacity = 1;
  setTimeout(function() { resolveAnswer(choice); }, 200);
}

function resolveAnswer(playerChoice) {
  var cur = state.current;
  stopTimer();
  var idx = cur.idx;
  var q   = cur.draw[idx];
  var correctBase = baseClassification(q.classification);
  var wasRight = (playerChoice === correctBase);

  cur.answers.push({
    question:     q,
    playerChoice: playerChoice,
    correctBase:  correctBase,
    wasRight:     wasRight
  });

  if (wasRight) {
    cur.score++;
    cur.streak++;
    sfxCorrect();
    var cleared = cur.clearedSlots;
    if (!cleared.has(idx)) {
      cleared.add(idx);
      var cell = el('grid-overlay').querySelector('[data-block-idx="' + idx + '"]');
      if (cell) cell.classList.add('clearing'); // animated puff
    }
  } else {
    cur.streak = 0;
    sfxWrong();
    if (cur.arcade) { cur.lives--; updateLives(); }
  }
  updateStreak(cur.streak);
  cur.locked = false;

  var atEnd = (idx + 1 >= cur.draw.length);
  var dead  = (cur.arcade && cur.lives <= 0);

  // #4: in instant-feedback mode, pause to show the answer before moving on.
  if (state.feedback === 'instant') {
    showInstantFeedback(q, wasRight, function() { afterAnswer(atEnd, dead); });
  } else {
    afterAnswer(atEnd, dead);
  }
}

// Proceed after an answer: end the round (completed or game over) or
// advance to the next question.
function afterAnswer(atEnd, dead) {
  var cur = state.current;
  if (dead) { cur.gameOver = true; showResultScreen(); return; }
  if (atEnd) { showResultScreen(); return; }
  cur.idx++;
  resetCard();
  showQuestion(cur.idx);
}

// #4: pause and show the correct answer + explanation before continuing.
function showInstantFeedback(q, wasRight, cb) {
  var cur = state.current;
  cur.locked = true; // block input while the overlay is up
  var ov = el('feedback-overlay');
  var res = el('feedback-result');
  res.textContent = wasRight ? '✓ CORRECT' : '✗ INCORRECT';
  res.className = 'feedback-result ' + (wasRight ? 'right' : 'wrong');
  el('feedback-answer').textContent =
    "It's a " + baseClassification(q.classification).toUpperCase() + '  (' + q.classification + ')';
  el('feedback-explain').textContent = q.explanation;
  el('btn-feedback-next').onclick = function() {
    ov.classList.remove('active');
    cur.locked = false;
    cb();
  };
  ov.classList.add('active');
}

function updateStreak(streak) {
  var elS = el('game-streak');
  if (streak >= 2) {
    elS.textContent = '🔥' + streak;
    elS.classList.add('show');
    elS.classList.remove('bump');
    void elS.offsetWidth;
    elS.classList.add('bump');
  } else {
    elS.classList.remove('show', 'bump');
    elS.textContent = '';
  }
}

// --------------- SWIPE / KEYBOARD INPUT (wired once) ---------------

function initInput() {
  var card = el('swipe-card');
  var startX = 0, dragging = false, dx = 0;

  card.addEventListener('pointerdown', function(e) {
    if (!state.current || state.current.locked) return;
    dragging = true; startX = e.clientX; dx = 0;
    card.classList.add('dragging');
    try { card.setPointerCapture(e.pointerId); } catch (err) {}
  });

  card.addEventListener('pointermove', function(e) {
    if (!dragging) return;
    dx = e.clientX - startX;
    card.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx * 0.04) + 'deg)';
    el('stamp-myth').style.opacity = dx < 0 ? Math.min(1, -dx / SWIPE_THRESHOLD) : 0;
    el('stamp-fact').style.opacity = dx > 0 ? Math.min(1,  dx / SWIPE_THRESHOLD) : 0;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    card.classList.remove('dragging');
    if (dx <= -SWIPE_THRESHOLD)      answer('Myth');
    else if (dx >=  SWIPE_THRESHOLD) answer('Fact');
    else resetCard(); // snap back
  }
  card.addEventListener('pointerup', endDrag);
  card.addEventListener('pointercancel', endDrag);

  el('btn-myth').addEventListener('click', function() { answer('Myth'); });
  el('btn-fact').addEventListener('click', function() { answer('Fact'); });

  document.addEventListener('keydown', function(e) {
    if (!el('screen-game').classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); answer('Myth'); }
    if (e.key === 'ArrowRight') { e.preventDefault(); answer('Fact'); }
  });

  // Keep smoke-block slices aligned when the window resizes — throttled with
  // requestAnimationFrame so device rotation / address-bar resizes stay smooth.
  var _resizeRaf = null;
  window.addEventListener('resize', function() {
    if (!state.current) return;
    if (_resizeRaf) cancelAnimationFrame(_resizeRaf);
    _resizeRaf = requestAnimationFrame(function() {
      var cfg = SUBLEVELS.find(function(s) { return s.id === state.current.sublevelId; });
      if (cfg && cfg.smokeImage) layoutSmokeCells(cfg.smokeImage);
    });
  });
}

// --------------- STAR UTILITIES ---------------

function calcStars(score, total) {
  var pct = score / total;
  if (pct >= 1)    return 3;
  if (pct >= 0.75) return 2;
  if (pct >= 0.5)  return 1;
  return 0;
}

function starsDisplay(n) {
  var s = '';
  for (var i = 1; i <= 3; i++) {
    s += (i <= n ? '★' : '☆');
    if (i < 3) s += ' ';
  }
  return s;
}

function updateBestStars(sublevelId, stars) {
  if (stars > state.bestStars[sublevelId]) {
    state.bestStars[sublevelId] = stars;
    saveProgress();
  }
}

// --------------- MUTE ---------------

function updateMuteButton() {
  var btn = el('btn-mute');
  if (btn) btn.textContent = state.muted ? '🔇' : '🔊';
}

function toggleMute() {
  state.muted = !state.muted;
  updateMuteButton();
  saveProgress();
  if (!state.muted) sfxClick();
}

// --------------- CELEBRATION ---------------

function showCelebration(callback) {
  var overlay = el('level-clear-overlay');
  var starsEl = el('lco-stars');
  starsEl.innerHTML = '';
  var glyphs = ['⭐', '✨', '🌟'];
  for (var i = 0; i < 14; i++) {
    var star = document.createElement('div');
    star.className = 'lco-star';
    star.textContent = glyphs[i % 3];
    var angle = (i / 14) * 2 * Math.PI;
    var dist  = 80 + Math.floor(Math.random() * 110);
    star.style.cssText =
      'left:50%;top:45%;' +
      '--dx:' + Math.round(Math.cos(angle) * dist) + 'px;' +
      '--dy:' + Math.round(Math.sin(angle) * dist) + 'px;' +
      'animation-delay:' + (i * 0.06) + 's';
    starsEl.appendChild(star);
  }
  overlay.classList.add('active');
  setTimeout(function() {
    overlay.classList.remove('active');
    callback();
  }, 1800);
}

// --------------- RESULT SCREEN ---------------

function showResultScreen() {
  var cur     = state.current;
  cur.locked  = true; // round is over — ignore any further card/button/key input
  stopTimer();
  var total   = cur.draw.length;
  var score   = cur.score;
  var gameOver = !!cur.gameOver;
  var perfect = (score === total) && !gameOver;
  var stars   = calcStars(score, total);
  var passed  = (stars >= UNLOCK_STARS) && !gameOver; // game over never unlocks
  var cfg     = SUBLEVELS.find(function(s) { return s.id === cur.sublevelId; });

  if (passed) advanceSublevel(cur.sublevelId);
  updateBestStars(cur.sublevelId, stars);

  var nextIdx  = SUBLEVELS.findIndex(function(s) { return s.id === cur.sublevelId; }) + 1;
  var hasNext  = nextIdx < SUBLEVELS.length;
  var nextName = hasNext ? SUBLEVELS[nextIdx].name : null;

  var header = el('result-header');
  header.textContent = gameOver ? 'GAME OVER' : (passed ? 'SUBLEVEL CLEARED!' : 'ROUND COMPLETE');
  header.className   = 'result-header' + (passed ? ' cleared' : '');

  el('result-sublevel').textContent = cfg.name.toUpperCase() + '  ·  LEVEL ' + cfg.num;
  el('result-stars').textContent    = starsDisplay(stars);
  el('result-score').textContent    = score + ' / ' + total;

  var msg    = el('result-msg');
  var subMsg = el('result-sub-msg');

  if (gameOver) {
    msg.textContent    = 'OUT OF LIVES!';
    subMsg.textContent = 'You got ' + score + ' right before running out of lives. Try again!';
  } else if (perfect) {
    msg.textContent = 'MASTERED! PERFECT SCORE';
    subMsg.textContent = hasNext
      ? nextName + ' is unlocked. You earned all 3 stars!'
      : 'You have mastered every sublevel!';
  } else if (passed) {
    msg.textContent = 'LEVEL UNLOCKED!';
    subMsg.textContent = (hasNext ? nextName + ' is now unlocked. ' : '')
      + 'Score ' + total + '/' + total + ' for a 3-star mastery.';
  } else if (stars === 1) {
    msg.textContent    = 'KEEP LEARNING!';
    var need1 = Math.ceil(total * 0.75) - score;
    subMsg.textContent = need1 + ' more correct to clear this sublevel. Check the review below.';
  } else {
    msg.textContent    = 'KEEP TRYING!';
    subMsg.textContent = 'Read the explanations carefully and give it another go.';
  }

  el('btn-result-review').onclick = function() {
    showReview();
  };
  el('btn-result-try').onclick = function() {
    beginSublevel(cur.sublevelId);
  };
  el('btn-result-map').onclick = function() {
    renderMapScreen();
    showScreen('screen-map');
  };

  // Final level cleared → offer the completion page (appears after this success screen)
  var finishBtn = el('btn-result-finish');
  if (!hasNext && passed) {
    finishBtn.style.display = '';
    finishBtn.onclick = function() { sfxClick(); showFinalScreen(); };
  } else {
    finishBtn.style.display = 'none';
  }

  if (passed) {
    sfxClear();
    showCelebration(function() {
      showScreen('screen-result');
    });
  } else {
    showScreen('screen-result');
  }
}

// --------------- FINAL / COMPLETION SCREEN ---------------

function showFinalScreen() {
  var maxStars = SUBLEVELS.length * 3;
  var totalStars = 0;
  SUBLEVELS.forEach(function(s) { totalStars += state.bestStars[s.id]; });

  el('final-stars').textContent = (totalStars >= maxStars ? '🏆 ' : '') + starsBig(totalStars, maxStars);
  el('final-score').textContent = totalStars + ' / ' + maxStars + ' STARS';

  // Per-level breakdown (shows every level passed)
  var bd = el('final-breakdown');
  bd.innerHTML = '';
  SUBLEVELS.forEach(function(s) {
    var row = document.createElement('div');
    row.className = 'fb-row';
    row.innerHTML = '<span>' + escHtml(s.name) + '</span>' +
                    '<span class="fb-stars">' + starsDisplay(state.bestStars[s.id]) + '</span>';
    bd.appendChild(row);
  });

  // Infographic link — works once a real URL is filled in
  var ig = el('btn-final-infographic');
  var urlReady = INFOGRAPHIC_URL && INFOGRAPHIC_URL.indexOf('[FILL') === -1;
  if (urlReady) {
    ig.textContent = '📊 VIEW THE INFOGRAPHIC';
    ig.disabled = false;
    ig.onclick = function() { sfxClick(); window.open(INFOGRAPHIC_URL, '_blank', 'noopener'); };
  } else {
    ig.textContent = '📊 INFOGRAPHIC (LINK COMING SOON)';
    ig.disabled = true;
    ig.onclick = null;
  }

  el('btn-final-menu').onclick = function() { showScreen('screen-title'); };
  showScreen('screen-final');
}

// Up to maxStars filled stars (★) then empty (☆) — for the final total.
function starsBig(n, max) {
  var s = '';
  for (var i = 1; i <= max; i++) { s += (i <= n ? '★' : '☆'); }
  return s;
}

// --------------- REVIEW SCREEN ---------------

function showReview() {
  var cur   = state.current;
  var total = cur.draw.length;

  el('review-score-badge').textContent = cur.score + ' / ' + total;

  // #3: doctor reacts to the player's score at the top of the review
  var docEl = el('review-doctor-text');
  if (docEl) {
    var pct = cur.score / total;
    if (pct >= 1)         docEl.textContent = "Perfect — you've truly cleared the air! Read on to lock it in.";
    else if (pct >= 0.75) docEl.textContent = 'Well done! Take a look at the ones you missed below.';
    else                  docEl.textContent = 'Good effort. Read these explanations, then give it another go.';
  }

  var list = el('review-list');
  list.innerHTML = '';

  cur.answers.forEach(function(a) {
    var q = a.question;
    var approved = questionApproved(q);
    var statusTag = approved
      ? '<span class="review-status approved">APPROVED</span>'
      : '<span class="review-status pending">PENDING</span>';
    var catTag = '<span class="review-category">' + escHtml(questionCategory(q, cur.sublevelId)) + '</span>';

    var card = document.createElement('div');
    card.className = 'review-card' + (a.wasRight ? '' : ' was-wrong');
    card.innerHTML =
      '<div class="review-card-top">' +
        '<div class="review-icon">' + (a.wasRight ? '✅' : '❌') + '</div>' +
        '<div class="review-statement">' + escHtml(q.statement) + '</div>' +
      '</div>' +
      '<div class="review-tags">' + catTag + statusTag + '</div>' +
      '<div class="review-classification">' + escHtml(q.classification) + '</div>' +
      '<div class="review-explanation">' + escHtml(q.explanation) + '</div>' +
      '<div class="review-citation">📚 ' + escHtml(q.citation) + '</div>';
    list.appendChild(card);
  });

  el('btn-review-action').onclick = function() { beginSublevel(cur.sublevelId); };
  el('btn-review-map').onclick    = function() {
    renderMapScreen();
    showScreen('screen-map');
  };

  showScreen('screen-review');
  list.scrollTop = 0;
}

function advanceSublevel(sublevelId) {
  var idx = SUBLEVELS.findIndex(function(s) { return s.id === sublevelId; });
  if (idx >= 0 && idx >= state.unlockedUpTo && idx + 1 < SUBLEVELS.length) {
    state.unlockedUpTo = idx + 1;
    saveProgress();
  }
}

// --------------- INIT ---------------

// Preload scene images so smoke slices and reveals paint instantly on first
// open (and cache smoke-image dimensions for the slice layout).
function preloadSceneImages() {
  SUBLEVELS.forEach(function(s) {
    if (s.bgImage) { var b = new Image(); b.src = s.bgImage; }
    if (s.smokeImage) {
      (function(src) {
        var im = new Image();
        im.onload = function() { _smokeImgDims[src] = { w: im.naturalWidth, h: im.naturalHeight }; };
        im.src = src;
      })(s.smokeImage);
    }
  });
  // UI backgrounds (doctor screen + About) — preload so they show instantly.
  ['assets/doc_yellow.jpg', 'assets/background_skull.jpg'].forEach(function(src) {
    var i = new Image(); i.src = src;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadProgress();
  preloadSceneImages();
  applyTranslations();
  initTitleScreen();
  initInput();
  updateMuteButton();

  el('btn-map-back').addEventListener('click', function() {
    showScreen('screen-title');
  });

  el('btn-doctor-continue').addEventListener('click', function() {
    if (pendingSublevel) beginSublevel(pendingSublevel);
  });
  el('btn-doctor-back').addEventListener('click', function() {
    renderMapScreen();
    showScreen('screen-map');
  });

  el('btn-mute').addEventListener('click', toggleMute);

  showScreen('screen-title');
});
