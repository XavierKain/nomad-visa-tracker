import React from "react";
import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ─── Colors ───
const COLORS = {
  bg: "#0a0a14",
  bgLight: "#12121e",
  card: "#1a1a2e",
  purple: "#7c5cfc",
  blue: "#4e8eff",
  text: "#e8e8f0",
  textMuted: "#8888a8",
  warning: "#ff6b6b",
  success: "#4ecdc4",
  gradient: "linear-gradient(135deg, #7c5cfc, #4e8eff)",
};

// ─── Helpers ───
const GradientText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <span
    style={{
      background: COLORS.gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      ...style,
    }}
  >
    {children}
  </span>
);

const FadeSlideIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
}> = ({ children, delay = 0, direction = "up", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  const translateMap = {
    up: `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`,
    down: `translateY(${interpolate(progress, [0, 1], [-60, 0])}px)`,
    left: `translateX(${interpolate(progress, [0, 1], [60, 0])}px)`,
    right: `translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`,
  };

  return (
    <div
      style={{
        opacity: progress,
        transform: translateMap[direction],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Slide 1: Problem ───
const ProblemSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseWarning = spring({
    frame: frame - 20,
    fps,
    config: { damping: 5, stiffness: 40, mass: 1.2 },
  });

  const counterValue = Math.min(Math.floor(interpolate(frame, [15, 60], [78, 91], { extrapolateRight: "clamp" })), 91);
  const isOver = counterValue > 90;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <FadeSlideIn delay={0}>
        <div
          style={{
            fontSize: 28,
            color: COLORS.textMuted,
            textAlign: "center",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Did you know?
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={8}>
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: `4px solid ${isOver ? COLORS.warning : COLORS.purple}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
            transform: isOver ? `scale(${1 + (pulseWarning - 1) * 0.05})` : undefined,
            boxShadow: isOver ? `0 0 60px ${COLORS.warning}40` : `0 0 40px ${COLORS.purple}30`,
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: isOver ? COLORS.warning : COLORS.text,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {counterValue}
          </div>
          <div style={{ fontSize: 20, color: COLORS.textMuted }}>/ 90 days</div>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={15}>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
            color: COLORS.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Thousands of nomads
          <br />
          <span style={{ color: COLORS.warning }}>accidentally overstay</span>
          <br />
          their visa every year
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={25}>
        <div
          style={{
            fontSize: 22,
            color: COLORS.textMuted,
            textAlign: "center",
            marginTop: 32,
            lineHeight: 1.5,
          }}
        >
          Fines. Entry bans. Deportation.
          <br />
          All because they lost count.
        </div>
      </FadeSlideIn>
    </AbsoluteFill>
  );
};

// ─── Slide 2: Solution ───
const SolutionSlide: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <FadeSlideIn delay={0}>
        <div
          style={{
            fontSize: 72,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          🌍
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={5}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            fontFamily: "Inter, system-ui, sans-serif",
            color: COLORS.text,
            marginBottom: 24,
          }}
        >
          Meet
          <br />
          <GradientText style={{ fontSize: 56 }}>
            Nomad Visa Tracker
          </GradientText>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={12}>
        <div
          style={{
            fontSize: 26,
            color: COLORS.textMuted,
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          The offline-first app that tracks your
          <br />
          visa days so you never overstay again.
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={20}>
        <div
          style={{
            marginTop: 48,
            padding: "20px 48px",
            borderRadius: 16,
            background: COLORS.gradient,
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Track. Know. Travel freely.
        </div>
      </FadeSlideIn>
    </AbsoluteFill>
  );
};

// ─── Slide 3: Features ───
const FeaturesSlide: React.FC = () => {
  const features = [
    { icon: "🇪🇺", title: "Schengen 90/180", desc: "Rolling window calculator" },
    { icon: "🇺🇸", title: "US Visa Tracking", desc: "B1/B2 & presence test" },
    { icon: "💰", title: "Tax Warnings", desc: "50+ jurisdictions" },
    { icon: "📅", title: "Trip Timeline", desc: "Visual travel history" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <FadeSlideIn delay={0}>
        <div
          style={{
            fontSize: 20,
            color: COLORS.purple,
            textTransform: "uppercase",
            letterSpacing: 3,
            marginBottom: 16,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Features
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={3}>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.text,
            textAlign: "center",
            marginBottom: 48,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Everything you need
          <br />
          to <GradientText>stay legal</GradientText>
        </div>
      </FadeSlideIn>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 750,
        }}
      >
        {features.map((f, i) => (
          <FadeSlideIn key={i} delay={8 + i * 6} direction="left">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: COLORS.card,
                borderRadius: 16,
                padding: "24px 28px",
                border: `1px solid ${COLORS.purple}20`,
              }}
            >
              <div style={{ fontSize: 40, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.text,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 18, color: COLORS.textMuted, marginTop: 4 }}>
                  {f.desc}
                </div>
              </div>
            </div>
          </FadeSlideIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide 4: CTA ───
const CTASlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = spring({
    frame: frame - 15,
    fps,
    config: { damping: 4, stiffness: 30, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <FadeSlideIn delay={0}>
        <div style={{ fontSize: 64, marginBottom: 24, textAlign: "center" }}>🛡️</div>
      </FadeSlideIn>

      <FadeSlideIn delay={5}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            color: COLORS.text,
            fontFamily: "Inter, system-ui, sans-serif",
            marginBottom: 16,
          }}
        >
          Stop guessing.
          <br />
          <GradientText>Start tracking.</GradientText>
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={12}>
        <div
          style={{
            fontSize: 24,
            color: COLORS.textMuted,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          $4.99 one-time · Works offline · No subscriptions
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={18}>
        <div
          style={{
            padding: "24px 64px",
            borderRadius: 20,
            background: COLORS.gradient,
            fontSize: 28,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Inter, system-ui, sans-serif",
            transform: `scale(${1 + (pulse - 1) * 0.03})`,
            boxShadow: `0 8px 40px ${COLORS.purple}50`,
          }}
        >
          Get Nomad Visa Tracker →
        </div>
      </FadeSlideIn>

      <FadeSlideIn delay={24}>
        <div
          style={{
            fontSize: 18,
            color: COLORS.textMuted,
            marginTop: 32,
            textAlign: "center",
          }}
        >
          nomadvisatracker.com
        </div>
      </FadeSlideIn>
    </AbsoluteFill>
  );
};

// ─── Main Composition ───
const SLIDE_DURATION = 90; // 3 seconds per slide at 30fps

const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <Sequence from={0} durationInFrames={SLIDE_DURATION}>
        <ProblemSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
        <SolutionSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 2} durationInFrames={SLIDE_DURATION}>
        <FeaturesSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 3} durationInFrames={SLIDE_DURATION}>
        <CTASlide />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
