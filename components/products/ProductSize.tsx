import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProductSizeProps = {
  size: string;
  setSize: (sizing: string) => void;
};

function SelectProductSize(props: SelectProductSizeProps) {
  const { size, setSize } = props;
  const productSizes = ["small", "medium", "large"];
  return (
    <>
      <h4 className="mb-2">Size : </h4>
      <Select
        defaultValue={size.toString()}
        onValueChange={(value) => setSize(value)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={size} />
        </SelectTrigger>
        <SelectContent>
          {productSizes.map((productSize, index) => {
            return (
              <SelectItem key={index} value={productSize}>
                {productSize}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductSize;
