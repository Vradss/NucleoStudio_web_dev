import Script from 'next/script'

export function ClarityAnalytics() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  // Solo cargar en producción y si existe el ID
  if (process.env.NODE_ENV !== 'production' || !clarityId) {
    return null
  }

  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `}
    </Script>
  )
}

