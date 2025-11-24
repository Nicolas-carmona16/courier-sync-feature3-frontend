"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { markSurveySkipped, readSurvey, saveSurvey, type SurveyPayload } from "@/lib/satisfaction"

interface SatisfactionSurveyProps {
  onSubmitted?: (payload: SurveyPayload) => void
  storageKey?: string
}

const ratingOptions = [1, 2, 3, 4, 5]

export function SatisfactionSurvey({ onSubmitted, storageKey }: SatisfactionSurveyProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<"pending" | "submitted" | "skipped">("pending")
  const [submitting, setSubmitting] = useState(false)
  const [lastResponse, setLastResponse] = useState<SurveyPayload | null>(null)

  useEffect(() => {
    let mounted = true
    readSurvey(storageKey).then((stored) => {
      if (!mounted || !stored) return
      setStatus(stored.status)
      setLastResponse(stored)
    })
    return () => {
      mounted = false
    }
  }, [])

  const canSubmit = useMemo(() => rating !== null && status === "pending", [rating, status])

  const handleSubmit = async () => {
    if (rating === null) return
    setSubmitting(true)
    const payload: SurveyPayload = {
      rating,
      comment: comment.trim() || undefined,
      status: "submitted",
      createdAt: new Date().toISOString(),
    }
    await saveSurvey(payload, storageKey)
    setStatus("submitted")
    setLastResponse(payload)
    setSubmitting(false)
    onSubmitted?.(payload)
  }

  const handleSkip = async () => {
    setSubmitting(true)
    await markSurveySkipped(storageKey)
    setStatus("skipped")
    setSubmitting(false)
  }

  if (status === "submitted" && lastResponse) {
    return (
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-black">Gracias por tu retroalimentación</h3>
          <span className="text-sm text-gray-500">{new Date(lastResponse.createdAt).toLocaleString("es-ES")}</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl font-bold text-courier-green">{lastResponse.rating}/5</div>
          <p className="text-gray-600 m-0">Tu calificación ayuda a mejorar el servicio de domicilios.</p>
        </div>
        {lastResponse.comment && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700">
            “{lastResponse.comment}”
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4">Solo administradores pueden revisar las respuestas cifradas.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-black">Encuesta de satisfacción</h3>
        <span className="text-sm text-gray-500">Toma menos de 30 segundos</span>
      </div>
      <p className="text-gray-600 mb-4">
        ¿Cómo calificarías tu último domicilio o interacción con soporte? 1 = Muy insatisfecho, 5 = Excelente.
      </p>

      <div className="flex gap-2 mb-4">
        {ratingOptions.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className={cn(
              "w-10 h-10 rounded-full border text-sm font-semibold transition-colors",
              rating === value
                ? "bg-courier-green text-white border-courier-green"
                : "bg-white text-gray-700 border-gray-300 hover:border-courier-green",
            )}
            aria-label={`Calificación ${value}`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="survey-comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comentarios (opcional)
        </label>
        <Textarea
          id="survey-comment"
          placeholder="Cuéntanos qué funcionó bien o qué podemos mejorar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="bg-courier-navy hover:bg-blue-800 text-white"
        >
          {submitting ? "Enviando..." : "Enviar encuesta"}
        </Button>
        <Button variant="outline" onClick={handleSkip} disabled={submitting}>
          Omitir por ahora
        </Button>
      </div>
    </div>
  )
}
