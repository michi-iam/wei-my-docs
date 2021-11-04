from django.db import models


class Tag(models.Model):
    class Meta:
        ordering = ('name', )
    name = models.CharField(max_length=40)
    def __str__(self):
        return self.name


class Entry(models.Model):
    tag = models.ManyToManyField(Tag, blank=True)
    title = models.CharField(max_length=160, null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    data = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# DELETEs all entries
# DELETEs all entries
def setup():

    allDocs = Entry.objects.all()
    for d in allDocs:
        d.delete()

    if len(Tag.objects.all()) < 4:
        x = 1
        while x < 5:
            name = "Tag " + str(x)
            tag = Tag.objects.create(name=name)
            x+=1
    x=0
    while x < 20:
        title = "Entry-Titel " + str(x)
        desc = "Es soll also auf den Namen der Stadt kein besonderer Wert gelegt werden. Wie alle großen Städte bestand sie aus Unregelmäßigkeit, Wechsel, Vorgleiten, Nichtschritthalten, Zusammenstößen von Dingen und Angelegenheiten, bodenlosen Punkten der Stille dazwischen, aus Bahnen und Ungebahntem, aus einem großen rhythmischen Schlag und der ewigen Verstimmung und Verschiebung aller Rhythmen gegeneinander, und glich im ganzen einer kochenden Blase, die in einem Gefäß ruht, das aus dem dauerhaften Stoff von Häusern, Gesetzen, Verordnungen und geschichtlichen Überlieferungen besteht. Die beiden Menschen, die darin eine breite, belebte Straße hinaufgingen, hatten natürlich gar nicht diesen Eindruck. Sie gehörten ersichtlich einer bevorzugten Gesellschaftsschicht an, waren vornehm in Kleidung, Haltung und in der Art, wie sie miteinander sprachen, trugen die Anfangsbuchstaben ihrer Namen bedeutsam auf ihre Wäsche gestickt, und ebenso, das heißt nicht nach außen gekehrt, wohl aber in der feinen Unterwäsche ihres Bewußtseins, wußten sie, wer sie seien und daß sie sich in einer Haupt- und Residenzstadt auf ihrem Platze befanden. Angenommen, sie würden Arnheim und Ermelinda Tuzzi heißen, was aber nicht stimmt, denn Frau Tuzzi befand sich im August in Begleitung ihres Gatten in Bad Aussee und Dr. Arnheim noch in Konstantinopel, so steht man vor dem Rätsel, wer sie seien. Lebhafte Menschen empfinden solche Rätsel sehr oft in den Straßen. Sie lösen sich in bemerkenswerter Weise dadurch auf, daß man sie vergißt, falls man sich nicht während der nächsten fünfzig Schritte erinnern kann, wo man die beiden schon gesehen hat. Diese beiden hielten nun plötzlich ihren Schritt an, weil sie vor sich einen Auflauf bemerkten. Schon einen Augenblick vorher war etwas aus der Reihe gesprungen, eine quer schlagende Bewegung; etwas hatte sich gedreht, war seitwärts gerutscht, ein schwerer, jäh gebremster Lastwagen war es, wie sich jetzt zeigte, wo er, mit einem Rad auf der Bordschwelle, gestrandet dastand. Wie die Bienen um das Flugloch hatten sich im Nu Menschen um einen kleinen Fleck angesetzt, den sie in ihrer Mitte freiließen. Von seinem Wagen herabgekommen, stand der Lenker darin, grau wie Packpapier, und erklärte mit groben Gebärden den Unglücksfall. Die Blicke der Hinzukommenden richteten sich auf ihn und sanken dann vorsichtig in die Tiefe des Lochs, wo man einen Mann, der wie tot dalag, an die Schwelle des Gehsteigs gebettet hatte. Er war durch seine eigene Unachtsamkeit zu Schaden gekommen, wie allgemein zugegeben wurde. Abwechselnd knieten Leute bei ihm nieder, um etwas mit ihm anzufangen; man öffnete seinen Rock und schloß ihn wieder, man versuchte ihn aufzurichten oder im Gegenteil, ihn wieder hinzulegen; eigentlich wollte niemand etwas anderes damit, als die Zeit ausfüllen, bis mit der Rettungsgesellschaft sachkundige und befugte Hilfe käme."
        entry = Entry.objects.create(title=title, desc=desc)
        y=0
        while y < 3:
            tag = Tag.objects.order_by('?')[0]
            entry.tag.add(tag)
            y+=1
        entry.save()
        x+=1