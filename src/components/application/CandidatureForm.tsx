import React from "react";

const CandidatureForm = () => {
  const config = formConfigFactory(category);
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return <div>CandidatureForm</div>;
};

export default CandidatureForm;
