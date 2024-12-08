import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CloudSunRain,
  Leaf,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const Preference = () => {
  return (
    <section className="bg-neutral-950 py-20">
      <div className="container grid grid-cols-2 lg:grid-cols-4 gap-10">
        <Card className="bg-inherit border-0 hover:shadow-md hover:shadow-neutral-700">
          <CardHeader>
            <CardTitle className="mx-auto mb-2">
              <CloudSunRain size={40} className="text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-center text-base font-semibold">
              Стійкість до атмосферних опадів та хімічних речовин
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-neutral-950 border-0 hover:shadow-md hover:shadow-neutral-700">
          <CardHeader>
            <CardTitle className="mx-auto mb-2">
              <SlidersHorizontal size={40} className="text-red-500" />
            </CardTitle>
            <CardDescription className="text-center text-base font-semibold">
              Широка гамма кольору та фактури (матова-глянець)
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-neutral-950 border-0 hover:shadow-md hover:shadow-neutral-700">
          <CardHeader>
            <CardTitle className="mx-auto mb-2">
              <ShieldCheck size={40} className="text-blue-500" />
            </CardTitle>
            <CardDescription className="text-center text-base font-semibold">
              Стійкість покриття до корозійного впливу
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-neutral-950 border-0 hover:shadow-md hover:shadow-neutral-700">
          <CardHeader>
            <CardTitle className="mx-auto mb-2">
              <Leaf size={40} className="text-green-500" />
            </CardTitle>
            <CardDescription className="text-center text-base font-semibold">
              Екологічність виробів та виробничого процесу
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default Preference;
