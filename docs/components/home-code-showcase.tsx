import type { ReactNode } from 'react';

const BlueprintExploded = (): ReactNode => (
  <svg className="home-blueprint-drawing" viewBox="0 0 680 470" role="img" aria-labelledby="blueprint-title">
    <title id="blueprint-title">Exploded technical view of createReStateMethods</title>
    <defs>
      <pattern id="exploded-minor-grid" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M12 0H0V12" className="bp-grid-minor" />
      </pattern>
      <pattern id="exploded-major-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="url(#exploded-minor-grid)" />
        <path d="M60 0H0V60" className="bp-grid-major" />
      </pattern>
      <marker
        id="exploded-arrow"
        viewBox="0 0 8 8"
        refX="4"
        refY="4"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M0 0L8 4 0 8Z" className="bp-arrow-fill" />
      </marker>
    </defs>
    <rect width="680" height="470" fill="url(#exploded-major-grid)" />
    <rect x="28" y="28" width="624" height="414" className="bp-sheet-border" />
    <path d="M438 28V442M28 336H438" className="bp-sheet-border" />

    <g className="bp-dimensions">
      <path d="M70 62H398" markerStart="url(#exploded-arrow)" markerEnd="url(#exploded-arrow)" />
      <text x="234" y="55" textAnchor="middle">
        OVERALL API SPAN / 05 SURFACES
      </text>
      <path d="M52 86V314" markerStart="url(#exploded-arrow)" markerEnd="url(#exploded-arrow)" />
      <text x="45" y="200" textAnchor="middle" transform="rotate(-90 45 200)">
        FACTORY HEIGHT / 01 CALL
      </text>
    </g>

    <g className="bp-exploded-axis" transform="translate(-42 0)">
      <path d="M236 80V322" strokeDasharray="5 5" />
      <circle cx="236" cy="200" r="86" />
      <circle cx="236" cy="200" r="76" />
      <path d="M150 200H322M236 114V286" />
    </g>

    <g className="bp-exploded-part bp-part-top" transform="translate(-42 0)">
      <path d="M188 103L236 77 284 103 236 129Z" />
      <path d="M188 103V119L236 145 284 119V103" />
      <text x="236" y="109" textAnchor="middle">
        KEY
      </text>
    </g>
    <g className="bp-exploded-part bp-part-core" transform="translate(-42 0)">
      <path d="M178 174L236 143 294 174 236 205Z" />
      <path d="M178 174V211L236 242 294 211V174" />
      <path d="M194 182L236 160 278 182 236 204Z" />
      <text x="236" y="219" textAnchor="middle">
        STORE
      </text>
    </g>
    <g className="bp-exploded-part bp-part-base" transform="translate(-42 0)">
      <path d="M188 264L236 238 284 264 236 290Z" />
      <path d="M188 264V280L236 306 284 280V264" />
      <text x="236" y="270" textAnchor="middle">
        TYPES
      </text>
    </g>

    <g className="bp-annotation">
      <path d="M242 102H350V86" />
      <circle cx="242" cy="102" r="3" />
      <text x="356" y="83">
        STATE IDENTIFIER
      </text>
      <text x="356" y="97">
        'counter'
      </text>
      <path d="M252 188H330" />
      <circle cx="252" cy="188" r="3" />
      <text x="336" y="184">
        EXTERNAL STORE
      </text>
      <text x="336" y="198">
        INITIAL VALUE / 0
      </text>
      <path d="M242 275H350V294" />
      <circle cx="242" cy="275" r="3" />
      <text x="356" y="293">
        INFERRED MODULE
      </text>
      <text x="356" y="307">
        NO PROVIDER
      </text>
    </g>

    <g className="bp-orthographic">
      <text x="54" y="358" className="bp-room-number">
        FRONT ELEVATION
      </text>
      <rect x="54" y="372" width="104" height="46" />
      <path d="M54 395H158M106 372V418M68 386H144M68 404H144" />
      <text x="178" y="358" className="bp-room-number">
        SIDE ELEVATION
      </text>
      <path d="M178 418V372H292V418ZM192 396H278M222 372V418M250 372V418" />
      <text x="312" y="358" className="bp-room-number">
        SCALE
      </text>
      <path d="M312 404H410M312 398V410M336 398V410M360 398V410M384 398V410M410 398V410" />
      <text x="312" y="420" className="bp-room-mini">
        0
      </text>
      <text x="404" y="420" textAnchor="end" className="bp-room-mini">
        5 API
      </text>
    </g>

    <g className="bp-parts-list">
      <text x="460" y="58" className="bp-core-title">
        OUTPUT ASSEMBLY
      </text>
      <text x="460" y="76" className="bp-core-meta">
        CREATE RE-STATE METHODS
      </text>
      {[
        ['01', 'useCounter', 'HOOK'],
        ['02', 'useCounterSelect', 'SELECTOR'],
        ['03', 'dispatchCounter', 'ACTION'],
        ['04', 'getCounter', 'GETTER'],
        ['05', 'resetCounter', 'RESET'],
      ].map(([number, name, type], index) => {
        const y = 110 + index * 49;
        return (
          <g key={name}>
            <rect x="460" y={y - 18} width="168" height="36" />
            <text x="470" y={y + 4} className="bp-part-number">
              {number}
            </text>
            <text x="496" y={y + 1} className="bp-part-name">
              {name}
            </text>
            <text x="616" y={y + 11} textAnchor="end" className="bp-part-type">
              {type}
            </text>
          </g>
        );
      })}
      <path d="M460 366H628M460 380H594" />
      <text x="460" y="405" className="bp-room-number">
        ASSEMBLY NOTE
      </text>
      <text x="460" y="421" className="bp-room-mini">
        ALL SURFACES SHARE ONE KEYED STORE.
      </text>
    </g>
  </svg>
);

export const HomeCodeShowcase = (): ReactNode => (
  <div className="home-blueprint home-blueprint-a">
    <div className="home-blueprint-sheet">
      <BlueprintExploded />
      <div className="home-blueprint-title-block">
        <div>
          <span>PROJECT</span>
          <strong>RE-STATE / SHARED STATE SYSTEM</strong>
        </div>
        <div>
          <span>DRAWING</span>
          <strong>COBALT EXPLODED</strong>
        </div>
        <div>
          <span>SHEET</span>
          <strong>A-01</strong>
        </div>
        <div>
          <span>REV</span>
          <strong>1.2.33</strong>
        </div>
      </div>
    </div>
  </div>
);
