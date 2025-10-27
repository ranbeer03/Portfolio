import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-20 text-zinc-200">
      {/* Hero */}
      <section className="mb-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Art that speaks in color and power.
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto">
          Bold, motivational paintings — large animals, vibrant abstracts, and
          pop-inspired works that inspire strength and ambition.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/shop" className="rounded-xl bg-zinc-100 px-6 py-3 text-black">
            Browse Art
          </a>
          <a href="/commissions" className="rounded-xl border border-zinc-700 px-6 py-3">
            Commission a Piece
          </a>
        </div>
      </section>

      {/* My Story */}
      <section className="mb-24 grid gap-12 md:grid-cols-2">
        <img
          src="/images/studio-hero.webp"
          alt="Artist painting in studio"
          className="rounded-2xl border border-zinc-700 object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold">From Canvas to Vision</h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            With a diploma in Fine Arts and a degree in Computer Science,
            painting became my outlet to capture energy, resilience, and ambition.
            My work celebrates strength — from a tiger’s gaze to the vastness of
            a whale or the playful edge of pop culture reimagined with motivational
            themes.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            I believe art should do more than decorate a wall — it should inspire
            you every day.
          </p>
          <p className="mt-6 text-sm text-zinc-500 italic">
            (This website is my own creation — designed and built by me.)
          </p>
        </div>
      </section>

      {/* My Art */}
      <section className="mb-24">
        <h2 className="text-3xl font-semibold text-center">What I Paint</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <img src="/images/tiger.webp" alt="Tiger painting" className="rounded-xl border border-zinc-700 object-cover"/>
          <img src="/images/abstract.webp" alt="Abstract painting" className="rounded-xl border border-zinc-700 object-cover"/>
          <img src="/images/pop.webp" alt="Pop-inspired painting" className="rounded-xl border border-zinc-700 object-cover"/>
        </div>
      </section>

      {/* Originals / Prints / Commissions */}
      <section className="mb-24 text-center">
        <h2 className="text-3xl font-semibold">Originals, Prints & Commissions</h2>
        <p className="mt-4 text-zinc-400">
          From one-of-a-kind canvases to limited giclée prints and custom commissions.
        </p>
        <a href="/commissions" className="mt-6 inline-block rounded-xl border border-zinc-700 px-5 py-3">
          Commission Your Piece
        </a>
      </section>

      {/* Exhibitions */}
      <section className="mb-24 text-center">
        <h2 className="text-3xl font-semibold">Seen & Collected</h2>
        <p className="mt-4 text-zinc-400">
          Exhibited at London art fairs, including the <strong>Roy Art Fair (2023)</strong>.
          Collected by private buyers internationally.
        </p>
      </section>

      {/* Final CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold">Bring Power to Your Space</h2>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
          Whether it’s an original canvas or a custom commission, my art is about
          energy, drive, and presence.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/shop" className="rounded-xl bg-zinc-100 px-6 py-3 text-black">
            Browse Available Works
          </a>
          <a href="/commissions" className="rounded-xl border border-zinc-700 px-6 py-3">
            Commission a Painting
          </a>
        </div>
      </section>
    </main>
  );
}
