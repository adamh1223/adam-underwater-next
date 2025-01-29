import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createEProductAction, createProductAction } from "@/utils/actions";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import CheckboxInput from "@/components/form/CheckboxInput";
import ImageInput from "@/components/form/ImageInput";

function CreateEProduct() {
  const name = faker.commerce.productName();
  // const description = faker.commerce.productDescription();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create EProduct
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createEProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput type="text" name="downloadLink" label="download link" />
            <FormInput type="text" name="WMVideoLink" label="WM Video link" />
            <FormInput type="text" name="location" label="location" />
            <FormInput type="text" name="keywords" label="keywords" />
            <PriceInput />
            <ImageInput />
            {/* <WMVideo /> */}
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />

          <SubmitButton text="Create Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateEProduct;
