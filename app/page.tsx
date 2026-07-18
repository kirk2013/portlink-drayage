"use client";

import { useState } from "react";

type Lang = "en" | "zh";

const copy = {
  en: {
    nav: ["Services", "Coverage", "Visibility", "Carriers", "About"],
    quote: "Get a Quote",
    track: "Track a Container",
    eyebrow: "NY/NJ PORT DRAYAGE · MANAGED END TO END",
    title: <>Drayage, managed<br />with control.</>,
    sub: "One accountable partner from port pickup to final delivery—backed by vetted capacity, milestone visibility, and standardized execution.",
    chips: ["Vetted carrier network", "Milestone visibility", "POD & EIR control"],
    active: "18 active",
    live: "Live Operations",
    routes: [["APM Terminal", "Bethlehem, PA", "IN TRANSIT"], ["Maher Terminal", "Edison, NJ", "APPOINTMENT SET"], ["Port Newark", "Allentown, PA", "DELIVERED"]],
    stats: [["97.4%", "On-time milestones"], ["99%", "Documents complete"]],
    sectionKicker: "ONE TEAM. EVERY MILESTONE.",
    sectionTitle: "Port-to-warehouse execution without the blind spots.",
    sectionText: "PortLink coordinates terminals, appointments, carriers, documents, and exceptions through one operating layer. Your team gets answers—not another list of phone numbers.",
    cards: [
      ["01", "Port control", "LFD, holds, appointments, pre-pulls, and empty returns monitored from one desk."],
      ["02", "Vetted capacity", "Qualified carriers matched to the lane, equipment, timing, and service requirement."],
      ["03", "Proof, not promises", "Milestone updates, POD, EIR, and accessorial evidence organized load by load."],
    ],
    coverageTitle: "Built for the NY/NJ port complex.",
    coverageText: "Focused coverage from the six major terminals to warehouses across New Jersey, Eastern Pennsylvania, and the New York metro area.",
    areas: ["Port Newark / Elizabeth", "APM · Maher · PNCT", "Bethlehem · Allentown", "Central & North Jersey", "New York Metro"],
    cnTitle: "A better U.S. drayage connection for cross-border teams.",
    cnText: "For importers and e-commerce teams operating from China, PortLink replaces fragmented handoffs with bilingual coordination, direct carrier access, clear charges, and U.S.-based exception management.",
    cnPoints: ["Bilingual operating support", "Clear accessorial approval", "Direct status visibility", "U.S. warehouse coordination"],
    carrierTitle: "Good carriers deserve better freight.",
    carrierText: "Join a standards-led network with clear dispatch, faster documents, consistent communication, and opportunities to grow your NY/NJ port volume.",
    join: "Join the Network",
    finalTitle: "Move your next container with clarity.",
    finalText: "Tell us the terminal, delivery location, equipment, and timing. Our team will return a clear operating plan and quote.",
    form: ["Name", "Work email", "Company", "Container / lane details"],
    submit: "Request a Quote",
    trackLabel: "Container number",
    trackHint: "Enter a container number to request a status update.",
    trackButton: "Check status",
    footer: "Managed drayage for the NY/NJ port complex.",
  },
  zh: {
    nav: ["拖柜服务", "服务区域", "全程跟踪", "车队合作", "关于我们"],
    quote: "获取报价",
    track: "查询集装箱",
    eyebrow: "纽约／新泽西港拖柜 · 全流程托管",
    title: <>美国拖柜，<br />进度看得见，异常有人管。</>,
    sub: "从码头提柜、仓库预约到还空，全程由美国本地团队统一协调。中文沟通、费用清楚、节点可查，不再隔着海外仓反复转问。",
    chips: ["合规车队网络", "关键节点可视", "POD／EIR归档"],
    active: "18票执行中",
    live: "实时运营中心",
    routes: [["APM码头", "宾州伯利恒", "运输中"], ["Maher码头", "新泽西Edison", "已预约"], ["纽瓦克港", "宾州Allentown", "已送达"]],
    stats: [["97.4%", "节点准时率"], ["99%", "文件完整率"]],
    sectionKicker: "一个窗口，管完整个拖柜流程",
    sectionTitle: "不只是帮您找一辆车，而是把每个环节真正管起来。",
    sectionText: "PortLink统一协调码头、车队、司机、仓库预约、文件和异常。您不需要在中国时差下追着不同的人问进度，打开系统即可看到当前状态。",
    cards: [
      ["01", "码头风险管理", "持续关注LFD、Hold、提柜预约、Pre-pull和空柜归还，降低滞箱与额外费用风险。"],
      ["02", "直接整合美国运力", "减少拖柜环节不必要的层层转包和加价，同时保留可靠的备用车队。"],
      ["03", "附加费有据可查", "等待费、底盘费等附加费用需有时间、照片或文件依据，确认后再进入账单。"],
    ],
    coverageTitle: "先把纽约／新泽西港做深、做稳。",
    coverageText: "覆盖纽约／新泽西港主要码头，重点服务新泽西、宾州东部及纽约都会区仓库。路线集中，调度更稳定，价格更有竞争力。",
    areas: ["Newark／Elizabeth港区", "APM · Maher · PNCT", "Bethlehem · Allentown", "新泽西中北部", "纽约都会区"],
    cnTitle: "为人在中国、货在美国的团队补上本地执行能力。",
    cnText: "您可以保留现有海外仓，但不必再让海外仓控制拖柜采购。PortLink直接连接美国合规运力，并替您处理英文沟通、仓库预约、进度跟踪和异常协调。",
    cnPoints: ["北京时间中文对接", "价格项目提前说清", "柜量进度集中查看", "美国本地异常处理"],
    carrierTitle: "有能力的车队，应该获得更稳定的订单。",
    carrierText: "我们为华人车队和合规Owner Operator提供清晰派单、标准节点、文件管理和更多纽约港业务机会，用服务表现换取长期货量。",
    join: "申请加入车队网络",
    finalTitle: "把下一个柜子交给更清楚的流程。",
    finalText: "告诉我们码头、送货地址、柜型和时间要求，美国团队会提供清晰的执行方案与报价。",
    form: ["姓名", "工作邮箱／微信", "公司名称", "柜号、码头、送货地址或路线需求"],
    submit: "提交询价",
    trackLabel: "集装箱号",
    trackHint: "输入集装箱号，向运营团队查询最新状态。",
    trackButton: "查询进度",
    footer: "纽约／新泽西港全流程拖柜服务。",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [tracking, setTracking] = useState(false);
  const [menu, setMenu] = useState(false);
  const t = copy[lang];

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PortLink home"><span className="brand-mark">P</span><span>PortLink</span></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? "×" : "☰"}</button>
        <nav className={menu ? "nav open" : "nav"}>
          {t.nav.map((item, i) => <button key={item} onClick={() => { scroll(["services", "coverage", "visibility", "carriers", "about"][i]); setMenu(false); }}>{item}</button>)}
        </nav>
        <div className="header-actions">
          <div className="language" aria-label="Language"><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button><span>/</span><button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>中文</button></div>
          <button className="button ghost" onClick={() => setTracking(true)}>{t.track}</button>
          <button className="button primary" onClick={() => scroll("quote")}>{t.quote}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className={lang === "zh" ? "zh-title" : ""}>{t.title}</h1>
          <p className="hero-copy">{t.sub}</p>
          <div className="hero-actions"><button className="button primary large" onClick={() => scroll("quote")}>{t.quote}</button><button className="button ghost large" onClick={() => setTracking(true)}>{t.track}</button></div>
          <div className="trust-row">{t.chips.map((x, i) => <div key={x}><span>{["✓", "⌖", "▤"][i]}</span>{x}</div>)}</div>
        </div>
        <aside className="ops-panel" aria-label={t.live}>
          <div className="ops-head"><h2>{t.live}</h2><span><i />{t.active}</span></div>
          <div className="routes">{t.routes.map((r, i) => <div className="route" key={r[0]}><span>{r[0]}</span><b>→</b><span>{r[1]}</span><em className={`status s${i}`}>{r[2]}</em></div>)}</div>
          <div className="stats">{t.stats.map((s) => <div key={s[1]}><strong>{s[0]}</strong><span>{s[1]}</span></div>)}</div>
          <div className="route-map"><div className="route-line" /><span className="node n1">APM</span><span className="node n2">Edison</span><span className="node n3">Bethlehem</span><span className="node n4">Allentown</span><div className="map-label">NJ · PA OPERATING CORRIDOR</div></div>
        </aside>
      </section>

      <section className="intro section" id="services">
        <div className="section-heading"><p className="eyebrow">{t.sectionKicker}</p><h2>{t.sectionTitle}</h2><p>{t.sectionText}</p></div>
        <div className="service-grid">{t.cards.map((c) => <article key={c[0]}><span>{c[0]}</span><h3>{c[1]}</h3><p>{c[2]}</p></article>)}</div>
      </section>

      <section className="coverage section" id="coverage">
        <div className="coverage-map"><span className="terminal-dot d1" /><span className="terminal-dot d2" /><span className="terminal-dot d3" /><div className="coverage-route" /><small>PORT NEWARK</small><strong>NY/NJ → PA</strong></div>
        <div className="coverage-copy"><p className="eyebrow">PORT COVERAGE</p><h2>{t.coverageTitle}</h2><p>{t.coverageText}</p><div className="area-list">{t.areas.map(x => <span key={x}>↗ {x}</span>)}</div></div>
      </section>

      <section className="crossborder section" id="visibility">
        <div><p className="eyebrow">CHINA ↔ UNITED STATES</p><h2>{t.cnTitle}</h2><p>{t.cnText}</p></div>
        <div className="point-grid">{t.cnPoints.map((p, i) => <div key={p}><span>0{i + 1}</span><strong>{p}</strong></div>)}</div>
      </section>

      <section className="carrier section" id="carriers"><div><p className="eyebrow">CARRIER NETWORK</p><h2>{t.carrierTitle}</h2><p>{t.carrierText}</p></div><button className="button primary large" onClick={() => scroll("quote")}>{t.join}</button></section>

      <section className="quote section" id="quote">
        <div><p className="eyebrow">START A CONVERSATION</p><h2>{t.finalTitle}</h2><p>{t.finalText}</p><a href="mailto:operations@portlink.com">operations@portlink.com</a></div>
        <form onSubmit={(e) => e.preventDefault()}><input aria-label={t.form[0]} placeholder={t.form[0]} /><input aria-label={t.form[1]} placeholder={t.form[1]} type="email" /><input aria-label={t.form[2]} placeholder={t.form[2]} /><textarea aria-label={t.form[3]} placeholder={t.form[3]} rows={4} /><button className="button primary large" type="submit">{t.submit}</button></form>
      </section>

      <footer id="about"><a className="brand" href="#top"><span className="brand-mark">P</span><span>PortLink</span></a><p>{t.footer}</p><div>© 2026 PortLink · NY/NJ</div></footer>

      {tracking && <div className="modal-backdrop" onClick={() => setTracking(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setTracking(false)}>×</button><p className="eyebrow">LIVE VISIBILITY</p><h2>{t.track}</h2><p>{t.trackHint}</p><label>{t.trackLabel}</label><input placeholder="MSCU1234567" autoFocus /><button className="button primary large">{t.trackButton}</button></div></div>}
    </main>
  );
}
