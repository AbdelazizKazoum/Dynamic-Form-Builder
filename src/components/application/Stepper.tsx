"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { defineStepper } from "@stepperize/react";
import { Locale } from "@/configs/i18n";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { Loader } from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";

const { useStepper, steps } = defineStepper(
  {
    id: "description",
    title: {
      en: "Offer Description",
      ar: "وصف العرض",
      fr: "Description de l'offre",
    },
    description: {
      en: "Enter your shipping details",
      ar: "أدخل تفاصيل الشحن الخاصة بك",
      fr: "Entrez vos détails d'expédition",
    },
  },
  {
    id: "attachment",
    title: {
      en: "Attachment",
      ar: "مرفق",
      fr: "Pièce jointe",
    },
    description: {
      en: "Enter your payment details",
      ar: "أدخل تفاصيل الدفع الخاصة بك",
      fr: "Entrez vos détails de paiement",
    },
  },
  {
    id: "verification",
    title: {
      en: "Verification",
      ar: "التحقق",
      fr: "Vérification",
    },
    description: {
      en: "Checkout complete",
      ar: "تم إكمال الدفع",
      fr: "Paiement terminé",
    },
  }
);

function Stepper({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  // Use state
  const [loading, setLoading] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false); // State to control modal visibility

  // Hooks
  const stepper = useStepper();
  const formRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const submitData = async () => {
    if (applicationData) {
      setSending(true);
      const res = await submitApplication(applicationData);
      if (res === "success") {
        router.push(`/${locale}/profile?section=candidatures`);
      }
    } else toast.error("Data is not submitted yet");
    setSending(false);
  };

  const submitAttachmentForm = () => {
    if (formRef.current) {
      // Trigger form submission in the child component
      formRef.current.click();
    }
  };

  if (loading)
    return (
      <>
        <Loading className="h-[500px]" />
      </>
    );

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <div className="flex justify-center">
        <nav
          aria-label="Checkout Steps"
          className="group my-4 w-[70%] max-w-[70%]"
        >
          <ol className="flex items-center justify-between gap-2 flex-wrap">
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    size="sm" // Smaller button for mobile
                    variant={
                      index <= stepper.current.index ? "default" : "secondary"
                    }
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-8 sm:size-10 items-center justify-center rounded-full"
                    // onClick={() => stepper.goTo(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-xs sm:text-sm font-medium text-black-600/80">
                    {step.title[locale]}
                  </span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${
                      index < stepper.current.index ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {!showModal && (
        <div className="container mx-auto">
          <div className="w-full  border border-gray-200 p-5 ">
            {stepper.switch({
              description: () => <div> first step </div>,
              attachment: () => <div>step 2</div>,
              verification: () => <div> step 3</div>,
            })}
          </div>

          {!stepper.isLast ? (
            <div className="flex justify-end gap-4 mt-10 ">
              <Button
                size="lg"
                onClick={() => {
                  stepper.next();
                }}
              >
                {stepper.isLast ? "Terminer" : dictionary.stepper.continue}
              </Button>
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
                size="lg"
              >
                {dictionary.stepper.back}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end gap-4 mt-10 ">
              <Button size="lg" disabled={sending} onClick={submitData}>
                {sending ? (
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                ) : null}
                {dictionary.stepper.submit}
              </Button>
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
                size="lg"
              >
                {dictionary.stepper.back}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Stepper;
