"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

type Lang = "en" | "zh";

const copy = {
  en: {
    nav: ["Services", "Coverage", "Why PortLink", "Carriers"],
    quote: "Request a Quote",
    track: "Request a Status Update",
    eyebrow: "NY/NJ PORT DRAYAGE • PA / NJ / NY",
    title: <>NY/NJ port drayage.<br/><em>Managed end to end.</em></>,
    sub: "A single operating partner for terminal coordination, carrier execution, warehouse delivery, documentation, and empty return across New Jersey, Eastern Pennsylvania, and the New York metro area.",
    primary: "Get a Drayage Quote",
    secondary: "See Our Coverage",
    facts: [["6", "major NY/NJ terminals"], ["3", "core delivery markets"], ["1", "accountable operating team"]],
    servicesKicker: "MANAGED DRAYAGE",
    servicesTitle: "One operating team from port release to empty return.",
    servicesIntro: "We do more than dispatch a truck. PortLink coordinates the terminal, carrier, driver, warehouse appointment, documents, and exceptions—so your team always knows who owns the next step.",
    services: [
      ["01", "Before pickup", "Release and hold checks, LFD monitoring, terminal appointments, equipment planning, and pre-pull coordination."],
      ["02", "On the road", "Qualified carrier assignment, milestone updates, delivery appointment coordination, and fast exception escalation."],
      ["03", "After delivery", "POD and EIR collection, empty-return monitoring, and documented review of accessorial charges."]
    ],
    coverageKicker: "LOCAL FOCUS. DEEPER CONTROL.",
    coverageTitle: "Built around the NY/NJ port complex.",
    coverageText: "Focused lanes create better carrier coverage, faster exception handling, and more consistent execution than a broad directory of phone numbers.",
    terminals: "Port Newark • Elizabeth • APM • Maher • PNCT • GCT Bayonne",
    markets: [["New Jersey", "North, Central, and key warehouse corridors"], ["Pennsylvania", "Bethlehem, Allentown, Lehigh Valley, and Eastern PA"], ["New York", "Metro-area delivery by lane review"]],
    chinaKicker: "FOR IMPORTERS & LOGISTICS TEAMS",
    chinaTitle: "Local execution without the usual blind spots.",
    chinaText: "PortLink gives importers, forwarders, and warehouse teams one operating window for pricing, scheduling, milestones, documents, and exception management.",
    chinaPoints: ["One accountable team", "Clear quote and charge review", "Direct milestone communication", "Warehouse coordination"],
    carrierKicker: "CARRIER PARTNERS",
    carrierTitle: "Reliable freight for carriers who execute well.",
    carrierText: "We work with compliant motor carriers and qualified owner-operators who value clear dispatch, fast communication, clean documentation, and long-term volume.",
    join: "Join the Carrier Network",
    quoteKicker: "START WITH ONE LANE",
    quoteTitle: "Tell us what needs to move.",
    quoteText: "Share the terminal, delivery ZIP code, container type, and timing. Our U.S. team will review the lane and respond with a clear plan.",
    fields: ["Name", "Work email", "Company", "Terminal, delivery ZIP, container type, timing"],
    send: "Prepare Quote Request",
    emailNote: "Your email app will open with the request prepared.",
    trackTitle: "Request a container status update",
    trackText: "Enter the container number and your email. Our operations team will verify the latest available status.",
    container: "Container number",
    footer: "Managed NY/NJ port drayage. One team. Clear ownership."
  },
  zh: {
    nav: ["拖柜服务", "服务区域", "中国客户", "车队合作"],
    quote: "获取报价",
    track: "查询柜子进度",
    eyebrow: "纽约／新泽西港拖柜 • 覆盖PA、NJ、NY",
    title: <>纽约／新泽西港拖柜<br/><em>全流程统一管理</em></>,
    sub: "从码头协调、运力安排、仓库交付到文件归档与还空，由一个运营窗口负责。覆盖新泽西、宾州东部及纽约都会区。",
    primary: "获取拖柜报价",
    secondary: "查看服务区域",
    facts: [["6", "纽约／新泽西主要码头"], ["3", "核心配送区域"], ["1", "统一运营窗口"]],
    servicesKicker: "全流程拖柜管理",
    servicesTitle: "不是只帮您找辆车，而是把整个拖柜流程管起来。",
    servicesIntro: "PortLink统一对接码头、车队、司机和收货仓。从LFD、预约到POD、EIR和还空，每一步都有明确负责人，发生异常也有人在美国现场协调。",
    services: [
      ["01", "提柜之前", "核查放行与Hold、关注LFD、安排码头预约、确认柜型和底盘，并协调需要的Pre-pull。"],
      ["02", "运输途中", "匹配合规运力、更新关键节点、协调仓库预约，遇到延误或异常及时处理并同步。"],
      ["03", "送达之后", "收集POD与EIR、跟进空柜归还；等待费等附加费用先核对证据，再进入账单。"]
    ],
    coverageKicker: "先把一片区域做深做稳",
    coverageTitle: "专注纽约／新泽西港及周边仓库线路。",
    coverageText: "线路集中，才能建立稳定车队、熟悉码头规则并快速处理异常。我们不做一张全国车队电话表，而是把纽约港到周边仓库真正执行好。",
    terminals: "Port Newark • Elizabeth • APM • Maher • PNCT • GCT Bayonne",
    markets: [["新泽西州", "覆盖北部、中部及主要仓库走廊"], ["宾夕法尼亚州", "Bethlehem、Allentown、Lehigh Valley及宾州东部"], ["纽约地区", "纽约都会区按具体路线确认"]],
    chinaKicker: "服务中国跨境企业",
    chinaTitle: "人在中国，也能直接掌握美国拖柜进度。",
    chinaText: "海外仓仍然负责收货和仓储，但拖柜不必再经过层层转包。PortLink为您提供美国本地的报价、调度、跟踪、文件和异常处理窗口。",
    chinaPoints: ["中文直接对接", "报价与附加费提前说明", "关键节点主动同步", "美国仓库预约协调"],
    carrierKicker: "车队合作",
    carrierTitle: "服务做得好的车队，应该获得更稳定的货量。",
    carrierText: "我们欢迎资质和保险齐全的车队及合规Owner Operator。清晰派单、及时沟通、文件规范、表现稳定，就有机会获得长期纽约港业务。",
    join: "申请加入车队网络",
    quoteKicker: "先从一条线路开始",
    quoteTitle: "告诉我们您的拖柜需求。",
    quoteText: "提供码头、送货邮编、柜型和时间要求，美国运营团队会核查线路并回复清晰方案。",
    fields: ["姓名", "邮箱", "公司名称", "码头、送货邮编、柜型、时间要求"],
    send: "生成询价邮件",
    emailNote: "点击后会打开您的邮箱，并自动填好询价内容。",
    trackTitle: "查询柜子最新进度",
    trackText: "输入柜号和邮箱，美国运营团队核实后回复最新可用状态。",
    container: "集装箱号",
    footer: "纽约／新泽西港全流程拖柜。一个团队，责任清楚。"
  }
};

export default function Home() {
  const pathname = usePathname();
  const lang: Lang = pathname.startsWith("/zh") ? "zh" : "en";
  const [menu, setMenu] = useState(false);
  const [tracking, setTracking] = useState(false);
  const t = copy[lang];

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const mail = (subject: string, body: string) => {
    window.location.href = `mailto:operations@portlink.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const submitQuote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    mail(`PortLink quote request — ${d.get("company") || d.get("name")}`, `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nCompany: ${d.get("company")}\n\nLane details:\n${d.get("details")}`);
  };
  const submitTrack = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    mail(`Container status request — ${d.get("container")}`, `Container: ${d.get("container")}\nReply to: ${d.get("email")}`);
  };

  return <main>
    <div className="utility-bar">
      <span>{lang === "zh" ? "纽约／新泽西港拖柜运营" : "NY/NJ PORT DRAYAGE OPERATIONS"}</span>
      <div><a href="mailto:operations@portlink.com">operations@portlink.com</a><span>{lang === "zh" ? "美国东部时间" : "EASTERN TIME"}</span></div>
    </div>
    <header className="header">
      <a className="logo" href="#top"><span>P</span><b>PortLink</b></a>
      <button className="menu" onClick={() => setMenu(!menu)}>{menu ? "×" : "☰"}</button>
      <nav className={menu ? "open" : ""}>
        {t.nav.map((x, i) => <a key={x} href={`${lang === "zh" ? "/zh" : ""}/${["services","coverage",lang === "zh" ? "about" : "standards","carriers"][i]}`} onClick={() => setMenu(false)}>{x}</a>)}
      </nav>
      <div className="actions">
        <button className="link-button" onClick={() => setTracking(true)}>{t.track}</button>
        <button className="solid small" onClick={() => go("quote")}>{t.quote}</button>
      </div>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="kicker">{t.eyebrow}</p>
        <h1 className={lang==="zh"?"zh":""}>{t.title}</h1>
        <p className="lead">{t.sub}</p>
        <div className="hero-buttons"><button className="solid" onClick={() => go("quote")}>{t.primary}</button><button className="outline" onClick={() => go("coverage")}>{t.secondary}</button></div>
      </div>
      <div className="hero-photo"><img src="/assets/portlink-hero.jpg" alt="Container drayage truck operating near the NY/NJ port complex" /><div className="photo-label"><span>PORT NEWARK / ELIZABETH</span><b>LOCAL OPERATIONS.<br/>CLEAR OWNERSHIP.</b></div></div>
    </section>

    <section className="factbar">{t.facts.map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</section>

    <section className="proof-strip" aria-label={lang === "zh" ? "服务标准" : "Operating standards"}>
      {(lang === "zh" ? ["放行与LFD持续核查", "码头及仓库预约协调", "POD与EIR文件归档", "异常与附加费证据管理"] : ["Release & LFD control", "Terminal & warehouse appointments", "POD & EIR discipline", "Exception & accessorial evidence"]).map((item, i) => <div key={item}><span>0{i + 1}</span><b>{item}</b></div>)}
    </section>

    <section className="trust-panel section">
      <div><p className="kicker">{lang === "zh" ? "统一运营责任" : "ONE OPERATING STANDARD"}</p><h2>{lang === "zh" ? "让拖柜服务更容易采购，也更容易管理。" : "Drayage that is easier to buy—and easier to manage."}</h2></div>
      <div className="trust-list">{(lang === "zh" ? [["01","统一负责人","从提柜到还空，由同一个运营窗口推进。"],["02","合规运力","根据线路、设备和时间要求安排合格承运资源。"],["03","关键节点","重要状态、异常和文件按照统一标准同步。"],["04","费用证据","等待费等附加费用依据可核查记录进行审核。"]] : [["01","Accountable desk","One operating point from container release through empty return."],["02","Qualified capacity","Carrier assignments reviewed against lane, equipment, and timing."],["03","Milestone discipline","Critical status, exceptions, and documents follow one standard."],["04","Charge support","Accessorial review organized around available operational evidence."]]).map(([n,h,p]) => <article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
    </section>

    <section className="services section" id="services">
      <div className="section-top"><div><p className="kicker">{t.servicesKicker}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesIntro}</p></div>
      <div className="service-cards">{t.services.map(([n,h,p]) => <article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
    </section>

    <section className="workflow section" id="standards">
      <div className="workflow-heading"><p className="kicker">{lang === "zh" ? "标准执行流程" : "STANDARD EXECUTION"}</p><h2>{lang === "zh" ? "每个柜子，都按同一套节点推进。" : "Every container moves through a defined operating sequence."}</h2></div>
      <div className="workflow-steps">
        {(lang === "zh" ? [["01","接收资料","柜号、码头、送货地址与时间要求"],["02","核查条件","放行、Hold、LFD、预约与设备"],["03","确认运力","匹配合规车队、司机与车辆"],["04","执行运输","提柜、送仓、签收与异常同步"],["05","完成闭环","POD、EIR、还空与费用核对"]] : [["01","Receive","Container, terminal, delivery point, and timing"],["02","Validate","Release, holds, LFD, appointments, and equipment"],["03","Assign","Compliant carrier, driver, and equipment"],["04","Execute","Pickup, delivery, milestones, and escalation"],["05","Close","POD, EIR, empty return, and charge review"]]).map(([n,h,p]) => <article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}
      </div>
    </section>

    <section className="capabilities section">
      <div className="capabilities-head"><div><p className="kicker">{lang === "zh" ? "核心服务能力" : "CORE CAPABILITIES"}</p><h2>{lang === "zh" ? "围绕每一票进口柜，提供完整执行支持。" : "The operating capabilities behind every import move."}</h2></div><p>{lang === "zh" ? "根据具体码头、路线、设备和仓库要求确认服务方案。所有节点由统一运营窗口协调。" : "Service plans are confirmed by terminal, lane, equipment, timing, and warehouse requirements—with one operating desk coordinating the full move."}</p></div>
      <div className="capability-grid">{(lang === "zh" ? [["码头协调","放行、Hold、LFD及提柜预约"],["仓库交付","预约、Live unload与Drop协调"],["设备安排","标准柜、超重及特殊底盘需求"],["Pre-pull管理","降低LFD与码头拥堵风险"],["还空跟踪","空柜场、截止时间及EIR归档"],["文件与费用","POD、EIR及附加费证据审核"]] : [["Terminal coordination","Release, holds, LFD, and pickup appointments"],["Warehouse delivery","Appointments, live unload, and drop coordination"],["Equipment planning","Standard, overweight, and chassis requirements"],["Pre-pull management","Planning around LFD and terminal congestion"],["Empty return control","Return location, cutoffs, and EIR records"],["Documents & charges","POD, EIR, and accessorial support review"]]).map(([h,p],i) => <article key={h}><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
    </section>

    <section className="sectors section">
      <div className="sectors-title"><p className="kicker">{lang === "zh" ? "客户类型" : "WHO WE SUPPORT"}</p><h2>{lang === "zh" ? "为需要美国本地拖柜执行能力的团队服务。" : "Built for teams that need dependable local drayage execution."}</h2></div>
      <div className="sector-list">{(lang === "zh" ? [["跨境电商与品牌方","在中国管理美国进口货物，需要中文沟通、清晰报价和美国本地异常处理。"],["进口商与出口企业","需要稳定完成港到仓运输，并集中管理节点、文件和额外费用。"],["货代与物流服务商","需要纽约港本地执行伙伴，为客户提供可追踪、可交付的拖柜服务。"],["海外仓与履约企业","需要协调码头提柜、仓库预约、Drop或Live unload，并降低沟通成本。"]] : [["Importers","Teams that need consistent port-to-warehouse execution and one point of operating accountability."],["Freight forwarders","Partners seeking dependable NY/NJ drayage capacity, milestone communication, and documentation."],["Warehouses & 3PLs","Facilities coordinating appointments, live unloads, drops, and recurring inbound container volume."],["E-commerce & retail","Import programs requiring clear delivery planning, exception escalation, and document control."]]).map(([h,p],i) => <article key={h}><span>0{i+1}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
    </section>

    <section className="coverage section" id="coverage">
      <div className="coverage-photo"><img src="/assets/portlink-terminal.jpg" alt="Container terminal and regional drayage operations" /><div><small>CORE CORRIDOR</small><strong>NY/NJ PORT<br/>→ NJ / PA / NY</strong></div></div>
      <div className="coverage-content"><p className="kicker">{t.coverageKicker}</p><h2>{t.coverageTitle}</h2><p>{t.coverageText}</p><div className="terminal-line">{t.terminals}</div>
        <div className="markets">{t.markets.map(([h,p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
      </div>
    </section>

    <section className="china section" id="china">
      <div className="china-copy"><p className="kicker">{t.chinaKicker}</p><h2>{t.chinaTitle}</h2><p>{t.chinaText}</p></div>
      <div className="china-points">{t.chinaPoints.map((x,i) => <div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div>
    </section>

    <section className="control section">
      <div className="control-copy"><p className="kicker">{lang === "zh" ? "费用与异常控制" : "DOCUMENTED EXCEPTIONS"}</p><h2>{lang === "zh" ? "附加费不能只凭一句话。" : "Accessorials should come with evidence."}</h2><p>{lang === "zh" ? "等待费、底盘拆分、Pre-pull、堆存等费用会影响每柜成本。PortLink要求保留时间、照片、EIR、仓库签字或其他可核查依据，再完成费用确认。" : "Waiting time, chassis splits, pre-pulls, storage, and other accessorials can materially change landed cost. PortLink organizes timestamps, photos, EIRs, signatures, and other available support before charge review."}</p></div>
      <div className="evidence-list">{(lang === "zh" ? [["01","到达与离开时间"],["02","POD／EIR／仓库签字"],["03","照片与码头文件"],["04","收费项目及审批记录"]] : [["01","Arrival and departure times"],["02","POD, EIR, and signatures"],["03","Photos and terminal documents"],["04","Charge detail and approval trail"]]).map(([n,x]) => <div key={n}><span>{n}</span><b>{x}</b><i>↗</i></div>)}</div>
    </section>

    <section className="engagement section">
      <div className="engagement-head"><p className="kicker">{lang === "zh" ? "合作启动" : "ENGAGEMENT MODEL"}</p><h2>{lang === "zh" ? "先核查线路，再确认执行方案。" : "A practical path from lane review to live execution."}</h2></div>
      <div className="engagement-grid">{(lang === "zh" ? [["01","线路核查","提供码头、送货地址、柜型、重量、卸货方式和预计时间。"],["02","方案确认","确认服务范围、基础报价、可能附加费、付款条件及沟通联系人。"],["03","开始执行","建立订单资料与节点要求，由运营团队推进首票并复盘。"]] : [["01","Lane review","Share terminal, delivery point, container type, weight, unload method, and expected timing."],["02","Operating setup","Confirm scope, base pricing, potential accessorials, payment terms, and communication contacts."],["03","Live execution","Set the shipment record and milestone requirements, execute the first move, and review performance."]]).map(([n,h,p]) => <article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
    </section>

    <section className="faq section">
      <div><p className="kicker">{lang === "zh" ? "常见问题" : "PROCUREMENT FAQ"}</p><h2>{lang === "zh" ? "合作前需要了解的事项。" : "What teams ask before the first move."}</h2></div>
      <div className="faq-list">{(lang === "zh" ? [["你们覆盖哪些地区？","目前重点覆盖纽约／新泽西港至新泽西、宾州东部和纽约都会区。具体邮编、柜型和重量需要逐条线路核查。"],["你们自己有车队吗？","PortLink负责统一协调与客户服务，并根据线路要求安排符合条件的承运车队。具体承运方会在执行资料中确认。"],["附加费怎样确认？","根据费用类型核对时间记录、照片、POD、EIR、仓库签字或码头文件等可用证据，再完成费用审核。"],["中国团队怎样沟通？","中文页面面向中国客户，可通过指定中文联系人提交询价、资料和异常需求；实际响应方式会在开户时确认。"]] : [["Where do you operate?","Our primary focus is the NY/NJ port complex to New Jersey, Eastern Pennsylvania, and the New York metro area. ZIP code, equipment, and weight are reviewed by lane."],["Do you operate your own fleet?","PortLink provides the operating coordination and customer interface, then assigns qualified motor-carrier capacity based on the specific move. The executing carrier is identified in shipment records."],["How are accessorials reviewed?","Available support may include timestamps, photos, POD, EIR, warehouse signatures, and terminal documentation, depending on the charge type."],["Can you support recurring volume?","Yes, recurring lanes can be reviewed for operating requirements, expected weekly volume, appointment patterns, and capacity planning before launch."]]).map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
    </section>

    <section className="carrier section" id="carriers">
      <div><p className="kicker">{t.carrierKicker}</p><h2>{t.carrierTitle}</h2><p>{t.carrierText}</p></div>
      <button className="light-button" onClick={() => go("quote")}>{t.join} <span>↗</span></button>
    </section>

    <section className="quote section" id="quote">
      <div><p className="kicker">{t.quoteKicker}</p><h2>{t.quoteTitle}</h2><p>{t.quoteText}</p><a href="mailto:operations@portlink.com">operations@portlink.com</a></div>
      <form onSubmit={submitQuote}>
        <div><label>{t.fields[0]}</label><input name="name" required /></div>
        <div><label>{t.fields[1]}</label><input name="email" type="email" required /></div>
        <div className="wide"><label>{t.fields[2]}</label><input name="company" required /></div>
        <div className="wide"><label>{t.fields[3]}</label><textarea name="details" rows={4} required /></div>
        <p className="note">{t.emailNote}</p><button className="solid" type="submit">{t.send}</button>
      </form>
    </section>

    <footer>
      <div className="footer-brand"><a className="logo" href="#top"><span>P</span><b>PortLink</b></a><p>{t.footer}</p></div>
      <div className="footer-col"><b>{lang === "zh" ? "服务区域" : "SERVICE AREA"}</b><span>New Jersey</span><span>Eastern Pennsylvania</span><span>New York Metro</span></div>
      <div className="footer-col"><b>{lang === "zh" ? "联系运营团队" : "OPERATIONS CONTACT"}</b><a href="mailto:operations@portlink.com">operations@portlink.com</a><span>{lang === "zh" ? "周一至周五 · 美国东部时间" : "Monday–Friday · Eastern Time"}</span></div>
      <div className="footer-bottom"><span>© 2026 PortLink. All rights reserved.</span><span>{lang === "zh" ? "具体服务能力及报价以线路审核为准。" : "Service availability and pricing are subject to lane review."}</span></div>
    </footer>

    {tracking && <div className="modal-bg" onClick={() => setTracking(false)}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="close" onClick={() => setTracking(false)}>×</button><p className="kicker">PORTLINK OPERATIONS</p><h2>{t.trackTitle}</h2><p>{t.trackText}</p><form onSubmit={submitTrack}><label>{t.container}</label><input name="container" placeholder="MSCU1234567" required/><label>{t.fields[1]}</label><input name="email" type="email" required/><button className="solid" type="submit">{t.track}</button></form></div></div>}
  </main>;
}
